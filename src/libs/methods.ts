import {AxiosError} from "axios";

export const showLabel = (text: string) => {
    // Convert camelCase to a space-separated string
    const camelToSpace = text.replace(/([a-z])([A-Z])/g, '$1 $2');

    // Convert snake_case to a space-separated string
    const snakeToSpace = camelToSpace.replace(/_/g, ' ');

    // Capitalize the first letter of the string
    return snakeToSpace.charAt(0).toUpperCase() + snakeToSpace.slice(1).toLowerCase();
}


export const showError = (err: unknown | Error | AxiosError) => {
    const message = typeof err === 'string'
        ? err
        : (((err as AxiosError)?.response?.data as {
        error: string
    }).error ?? "Sorry something went wrong,please try again");
    return err instanceof AxiosError
        ? err.code == "ERR_NETWORK"
            ? {title: "Error!", color: 'red', message: "Can't reach the server right now!"}
            : {title: "Error!", color: 'red', message: message}
        : {title: "Error!", color: "red", message: message};
}
