import {UserClientRequest, UserRequest} from "./CoffeeRequest";

const userRequest = new UserClientRequest();

export class Auth {
    static sessionId: string | null;

    static async getSessionId(): Promise<string | null> {
        try {
            const item = new UserRequest({email: "string", password: "string"}); //TODO: set parameters from your's inputs
            Auth.sessionId = await userRequest.authorization(item);
        } catch (e) {
            alert("Authorization failed");
        }

        return Auth.sessionId;
    }
}