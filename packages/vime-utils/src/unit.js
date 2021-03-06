export const is_null = (input) => input === null;
export const is_undefined = (input) => typeof input === 'undefined';
export const is_null_or_undefined = (input) => is_null(input) || is_undefined(input);

export const get_constructor = (input) => (
  !is_null_or_undefined(input) ? input.constructor : null
);

export const is_object = (input) => get_constructor(input) === Object;
export const is_number = (input) => get_constructor(input) === Number && !Number.isNaN(input);
export const is_string = (input) => get_constructor(input) === String;
export const is_boolean = (input) => get_constructor(input) === Boolean;
export const is_function = (input) => get_constructor(input) === Function;
export const is_array = (input) => Array.isArray(input);

export const is_async_function = (input) => {
  const constructor = get_constructor(input);
  return constructor ? (constructor.name === 'AsyncFunction') : false;
};

export const is_empty = (input) => is_null_or_undefined(input)
    || ((is_string(input) || is_array(input)) && !input.length)
    || (is_object(input) && !Object.keys(input).length);

export const is_instance_of = (input, constructor) => Boolean(
  input && constructor && input instanceof constructor,
);

export const is_prototype_of = (input, object) => Boolean(
  input && object && Object.isPrototypeOf.call(object.prototype, input),
);
