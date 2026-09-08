function class_attribute_name(attribute)
{
    const key = attribute.key;
    const name = attribute.directive
        ? key.name.name === 'bind' && key.argument?.type === 'VIdentifier' ? key.argument.name : ''
        : key.name;
    return /(?:^|\W)(class|card_class)$/.test(name) ? name : null;
}

module.exports = class_attribute_name;
