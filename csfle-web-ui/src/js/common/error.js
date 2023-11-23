
export const onError = (error) => {
    let message = error.toString();

    // Auth errors
    if (!(error instanceof Error) && error.message) {
        message = error.message;
    }

    console.log(message);
};
