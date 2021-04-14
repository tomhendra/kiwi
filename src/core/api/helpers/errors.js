const green = '\x1b[32m';
const yellow = '\x1b[33m';
const red = '\x1b[31m';
const reset = '\x1b[0m';

function handleSetupError(promise, entity) {
  return promise
    .then(data => {
      console.log(green, '   [ Success ]', reset, `'${entity}'`);
      return data;
    })
    .catch(error => {
      if (error && error.message === 'instance already exists') {
        console.warn(
          yellow,
          '   [ Skipped ]',
          reset,
          `'${entity}', it already exists`,
        );
      } else {
        console.error(
          red,
          '   [ Failed ]',
          reset,
          `'${entity}', with error:`,
          error,
        );
      }
    });
}

function handlePromiseError(promise, entity) {
  return promise
    .then(data => {
      console.log(green, '   [ Success: Query ]', reset, `'${entity}'`);
      return data;
    })
    .catch(error => {
      if (error && error.message === 'instance already exists') {
        console.warn(
          yellow,
          '  [ Skipped: Query ]',
          reset,
          `'${entity}', it already exists`,
        );
      } else {
        console.error(
          red,
          '   [ Failed: Query  ]',
          reset,
          `'${entity}', with error:`,
          error,
        );
      }
    });
}

export { handleSetupError, handlePromiseError };
