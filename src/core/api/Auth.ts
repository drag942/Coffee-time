import {UserClientRequest, UserRequest} from "./CoffeeRequest";

const userRequest = new UserClientRequest();

export class Auth {
    static sessionId: string | null;

    static async getSessionId(login: string, password: string): Promise<string | null> {
        try {
            const item = new UserRequest({email: login, password});
            //TODO: delete todo's after fix
            Auth.sessionId = await userRequest.authorization(item);
        } catch (e) {
            alert("Authorization failed");
        }

        return Auth.sessionId;
    }
}