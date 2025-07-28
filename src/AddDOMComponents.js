function createHtmlEl({
  tag = 'div',
  parent,
  props = {},
  textContent = '',
  children = [],
  appendOrder = 'normal', // "reverse" to reverse child appending
} = {}) {
  const element = document.createElement(tag);
  Object.assign(element, props);

  if (textContent) element.textContent = textContent;

  if (children.length) {
    if (appendOrder === 'reversed') {
      children.reverse().forEach((child) => element.appendChild(child));
    } else {
      children.forEach((child) => element.appendChild(child));
    }
  }

  if (parent) parent.append(element);
  return element;
}

function createHtmlLabelInput({
  parent,
  inputProps = {},
  labelProps = {},
  labelText = '',
  inputType = 'text',
  reverseOrder = false,
  required = false,
  value = '',
  wrapperTag = 'div',
  wrapperProps = {},
  dateDefault = null,
} = {}) {
  const input = createHtmlEl({
    tag: 'input',
    props: { type: inputType, ...inputProps },
  });

  if (value) input.setAttribute('value', value);
  if (required) input.setAttribute('required', true);
  if (inputType === 'date' && dateDefault) {
    input.valueAsDate = dateDefault;
  }

  const label = createHtmlEl({
    tag: 'label',
    textContent: labelText,
    props: { htmlFor: inputProps.id, ...labelProps },
  });

  const wrapper = createHtmlEl({
    tag: wrapperTag,
    parent,
    props: wrapperProps,
    children: reverseOrder ? [input, label] : [label, input],
  });

  return wrapper;
}

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export { createHtmlEl, createHtmlLabelInput, removeAllChildren };
