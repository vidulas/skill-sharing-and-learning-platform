import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";
import PersonalizGoals from "./components/PersonalisedGoals/PersonalizGoals";
import LearningPlanApp from "./components/LearnPlanSharing/LearningPlanUI";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<PersonalizGoals/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
