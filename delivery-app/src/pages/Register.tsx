import { Main } from "../components/Main";
import { TextInput } from "../components/TextInput";
import { useCenterRoot } from "../hooks/useCenterRoot";

export function Register() {
    useCenterRoot();

    return (
        <Main fitContent>
            <h1>Register</h1>
            <form>
                <TextInput />
            </form>
        </Main>
    );
}
