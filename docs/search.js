// The search box of every page reaches every page: under it, the rules,
// terms, guides, diagrams and forms that match the query, wherever they
// are, this page's first; the first is selected, and Enter or a click lands
// on it. Matched the way the page filters (filter1_from_spec); the index is
// search_index.js, written by bin/build.
(function () {
    const PAGE_NAMES = {
        'rules.html': 'Rules',
        'animations.html': 'Animations',
        'agents.html': 'Agents',
        'diagrams.html': 'Diagrams',
        'apis.html': 'APIs',
        'glossaries.html': 'Glossaries',
    };
    const LIMIT = 8;
    const STYLE = `
.everywhere {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: max(100%, 420px);
    max-width: calc(100vw - 32px);
    max-height: min(60vh, 440px);
    overflow: auto;
    margin: 0;
    padding: 4px 0;
    list-style: none;
    background: var(--surface);
    border: 1px solid var(--line);
    box-shadow: 0 8px 24px rgb(0 0 0 / 0.14);
    z-index: 50;
}

.everywhere li {
    display: flex;
    gap: 10px;
    align-items: baseline;
    padding: 6px 12px;
    cursor: pointer;
    color: var(--ink);
    font-size: 14px;
    line-height: 1.35;
}

.everywhere li[aria-selected="true"] {
    background: var(--accent-soft);
}

.everywhere .code {
    flex: none;
    font-family: var(--mono);
    font-size: 12px;
    color: var(--accent);
}

.everywhere .name {
    flex: 1 1 auto;
    min-width: 0;
}

.everywhere .where {
    flex: none;
    font-family: var(--mono);
    font-size: 12px;
    color: var(--muted);
}

.everywhere li.more {
    cursor: default;
    color: var(--muted);
    font-size: 12.5px;
}
`;

    const q_el = document.getElementById('q');
    const page = location.pathname.split('/').pop() || 'index.html';
    const entries = window.SEARCH_INDEX ?? [];
    const list_el = document.createElement('ul');
    let hits = [];
    let selected = -1;

    main();

    function main() {
        if (!q_el) {
            return;
        }
        const style_el = document.createElement('style');
        style_el.textContent = STYLE;
        document.head.append(style_el);
        list_el.className = 'everywhere';
        list_el.id = 'everywhere';
        list_el.setAttribute('role', 'listbox');
        list_el.setAttribute('aria-label', 'Found on every page');
        list_el.hidden = true;
        q_el.closest('.search').append(list_el);
        q_el.setAttribute('role', 'combobox');
        q_el.setAttribute('aria-controls', list_el.id);
        q_el.setAttribute('aria-expanded', 'false');
        q_el.setAttribute('aria-autocomplete', 'list');
        q_el.addEventListener('input', refresh);
        q_el.addEventListener('focus', refresh);
        q_el.addEventListener('blur', blur_q);
        q_el.addEventListener('keydown', keydown_q);
        // A press on the list keeps the focus in the box, so the list stays for the click.
        list_el.addEventListener('pointerdown', v => v.preventDefault());
        list_el.addEventListener('click', click_list);
        list_el.addEventListener('pointermove', pointermove_list);
    }

    function refresh() {
        const query = query_parse(q_el.value);
        hits = query.empty ? [] : hits_from_query(query);
        selected = hits.length ? 0 : -1;
        render();
    }

    // Name matches before text matches; this page's before the others, each
    // in the order of its page.
    function hits_from_query(query) {
        const named = [];
        const told = [];
        for (const entry of entries) {
            if (query.filter(`${entry.id} ${entry.name}`.toLowerCase())) {
                named.push(entry);
            }
            else if (query.filter(entry.text)) {
                told.push(entry);
            }
        }
        return [...named.sort(here_first), ...told.sort(here_first)];
    }

    function here_first(a, b) {
        return (b.page === page) - (a.page === page);
    }

    function render() {
        const shown = hits.slice(0, LIMIT);
        const items = shown.map(function (entry, i) {
            const code = entry.code ? `<span class="code">${html_escape(entry.code)}</span>` : '';
            const where = (entry.page === page) ? 'here' : (PAGE_NAMES[entry.page] ?? entry.page);
            return `<li role="option" id="everywhere_${i}" aria-selected="${i === selected}" data-index="${i}">${code}<span class="name">${html_escape(entry.name)}</span><span class="where">${html_escape(where)}</span></li>`;
        });
        if (hits.length > LIMIT) {
            items.push(`<li class="more" aria-disabled="true">${LIMIT} of ${hits.length}: type more to narrow</li>`);
        }
        list_el.innerHTML = items.join('');
        const open = shown.length > 0 && (document.activeElement === q_el);
        list_el.hidden = !open;
        q_el.setAttribute('aria-expanded', String(open));
        if (open && (selected >= 0)) {
            q_el.setAttribute('aria-activedescendant', `everywhere_${selected}`);
            list_el.querySelector(`[data-index="${selected}"]`).scrollIntoView({block: 'nearest'});
        }
        else {
            q_el.removeAttribute('aria-activedescendant');
        }
    }

    function blur_q() {
        list_el.hidden = true;
        q_el.setAttribute('aria-expanded', 'false');
    }

    function keydown_q(event) {
        if (event.isComposing || event.ctrlKey || event.metaKey || event.altKey || list_el.hidden) {
            return;
        }
        const end = Math.min(hits.length, LIMIT);
        switch (event.key) {
        case 'ArrowDown':
            event.preventDefault();
            selected = (selected + 1) % end;
            render();
            break;
        case 'ArrowUp':
            event.preventDefault();
            selected = (selected - 1 + end) % end;
            render();
            break;
        case 'Enter':
            if (selected >= 0) {
                event.preventDefault();
                land(hits[selected]);
            }
            break;
        case 'Escape':
            // the page clears the query itself
            blur_q();
            break;
        }
    }

    function click_list(event) {
        const item_el = event.target.closest('li[data-index]');
        if (item_el) {
            land(hits[Number(item_el.dataset.index)]);
        }
    }

    function pointermove_list(event) {
        const item_el = event.target.closest('li[data-index]');
        if (item_el && (Number(item_el.dataset.index) !== selected)) {
            selected = Number(item_el.dataset.index);
            render();
        }
    }

    // On this page the item comes into view, the filter cleared only when it
    // hides the item; another page opens whole, at the item.
    function land(entry) {
        blur_q();
        if (entry.page !== page) {
            location.href = `${entry.page}#${entry.id}`;
            return;
        }
        const target_el = document.getElementById(entry.id);
        if (target_el?.closest('[hidden]')) {
            q_el.value = '';
            q_el.dispatchEvent(new Event('input', {bubbles: true}));
        }
        q_el.blur();
        location.hash = entry.id;
        target_el?.scrollIntoView();
    }

    // The same query the page filters with: its words are the parts of one
    // spec of filter1_from_spec.
    function query_parse(text) {
        const spec = text.toLowerCase().trim().split(/\s+/).join('/');
        return {empty: !spec, filter: window.filter1_from_spec(spec)};
    }

    function html_escape(text) {
        return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
})();
