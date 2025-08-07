import timelineItems from "./database/timelineItems";
import { Timeline } from "./components/Timeline";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Timeline Application
        </h1>
        <Timeline items={timelineItems} />
      </div>
    </div>
  );
}

export default App;
