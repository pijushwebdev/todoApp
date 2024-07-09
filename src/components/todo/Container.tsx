import { ReactNode } from "react";


type TContainer = {
    children: ReactNode
}
const Container = ({children}: TContainer) => {
    return (
        <div className="w-full max-w-7xl mx-auto h-screen bg-cyan-700">
            { children }
        </div>
    );
};

export default Container;