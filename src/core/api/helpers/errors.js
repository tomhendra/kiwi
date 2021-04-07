function handleSetupError(promise, entity) {
  return promise
    .then(data => {
      console.log(`   [ Executed ] '${entity}'`);
      return data;
    })
    .catch(error => {
      if (error && error.message === 'instance already exists') {
        console.warn(`   [ Skipped ] '${entity}', it already exists`);
      } else {
        console.error(`   [ Failed ] '${entity}', with error:`, error);
      }
    });
}

export { handleSetupError };
