import {Email, ObjectKey, Password, Player, User} from "common/types/commonTypes";
import objectKeys from "app/state/objectKeys";


const authenticate = async ({email, password}: { email: Email, password: Password }): Promise<User> => {
    // todo - fetch users and check password
    return Promise.resolve({
        key: "9f818bba-3c17-42e2-9aff-168cd2c8f387",
        name: 'dummy user 1',
        password: 'geheim',
        player: [
            {
                name: 'dummy.player',
                key: '4031e661-91a5-4130-b61e-6c063cfe48ac',
                worlds: {}
            }
        ]
    })
}

const authenticationService = {
    authenticate
}

export default authenticationService