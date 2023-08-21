type ValidateFn = (value?: string) => string | void;
export const required: ValidateFn = (value?: string) => {
  if (!value || value === '') return 'Field cannot be empty';
};

export const optional =
  (fn: (value: string) => string | void): ValidateFn =>
  (value?: string) =>
    value ? fn(value) : undefined;

export const minLength = (size: number) =>
  optional((value: string) => {
    if (value.length < size) return `Min field size is ${size} chars`;
  });

export const maxLength = (size: number) =>
  optional((value: string) => {
    if (value.length > size) return `Max field size is ${size} chars`;
  });

export const regexp = (
  regExp: RegExp,
  message = 'Field does not meet the conditions'
) =>
  optional((value: string) => {
    if (!regExp.test(value)) return message;
  });

export const nameValidation = regexp(
  /^[A-Za-z0-9_]*$/,
  'Must contain only letters, digits, and underscores (_)'
);

export const emailValidation = regexp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  'Email is incorrect'
);

export const imageLinkValidation = regexp(
  /(http(s?):)([/|.|\w|\s|-])*/,
  'Link to image is incorrect'
);

export const colorValidation = regexp(
  /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  'Color is in incorrect format. Hex color is required'
);

export const validate =
  (...args: ValidateFn[]): ValidateFn =>
  (value?: string) =>
    args.reduce<string | undefined>((sum, validate) => {
      if (sum) return sum;
      return validate(value) ?? undefined;
    }, undefined);
