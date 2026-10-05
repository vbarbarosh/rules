- An element that takes files or folders, a form with an input for a folder
  or files, must also understand drag-and-drop onto it: a file dropped on it.
- When such an element is made, the drop is made with it: the user expects
  this behaviour.

# File drop

Anywhere the user can pick files or a folder, they can also drag them in. An
element that takes files through an input, whether a `<input type="file">` or a
"Choose folder…" button, also takes the same files dropped onto it. People
drag a file from their file manager first and look for the button second;
an element that ignores the drop looks broken.

## The rule

1. **Input and drop come together.** An element that takes files or folders
   through an input also takes them dropped onto it. Neither is built without
   the other.
2. **The drop takes what the input takes.** That means the same `accept`
   types, one file or many as `multiple` says, and folders when the input
   takes folders (`webkitdirectory`). A dropped folder is read through
   `webkitGetAsEntry()`, file by file.
3. **The element shows it will take them.** While files are dragged over it,
   it highlights. A drop beside it never opens the file in the tab and loses
   the page: the window cancels `dragover` and `drop`.

## Canonical form

```js
window.addEventListener('dragover', event => event.preventDefault());
window.addEventListener('drop', event => event.preventDefault());

function file_drop_bind(element, take)
{
    element.addEventListener('dragover', function (event) {
        event.preventDefault();
        element.classList.add('is-drop-over');
    });
    element.addEventListener('dragleave', function (event) {
        if (!element.contains(event.relatedTarget)) {
            element.classList.remove('is-drop-over');
        }
    });
    element.addEventListener('drop', async function (event) {
        event.preventDefault();
        element.classList.remove('is-drop-over');
        const entries = [...event.dataTransfer.items].map(v => v.webkitGetAsEntry()).filter(Boolean);
        const files = [];
        for (const entry of entries) {
            await entry_files_read(entry, files);
        }
        take(files.length ? files : [...event.dataTransfer.files]);
    });
}

async function entry_files_read(entry, out)
{
    if (entry.isFile) {
        out.push(await new Promise((res, rej) => entry.file(res, rej)));
        return;
    }
    const reader = entry.createReader();
    while (true) {
        const entries = await new Promise((res, rej) => reader.readEntries(res, rej));
        if (entries.length === 0) {
            break;
        }
        for (const child of entries) {
            await entry_files_read(child, out);
        }
    }
}
```

`take` is the same function the input's `change` handler calls, so a picked
file and a dropped one go down one path.

The entries are taken from `dataTransfer.items` before the first `await`. The
browser empties `dataTransfer` once the drop handler yields, so they cannot be
read later.

`readEntries()` returns a folder's contents in batches (100 at a time in
Chrome), so it is called until it returns an empty batch.

`dragleave` also fires when the pointer moves onto a child of the element. The
`relatedTarget` check keeps the highlight from flickering.
