import React from "react";
import ExportCenter from "./pages/ExportCenter";
import CollectionDetails from "./pages/CollectionDetails";
import Favorites from "./pages/Favorites";
import { DashboardPage } from "./pages/DashboardPage";
import { DiscoveryPage } from "./pages/DiscoveryPage";
import { WaypointProvider } from "./context/WaypointContext";

function App() {
    return( 
        <WaypointProvider>
            <DiscoveryPage/>
        </WaypointProvider>
    );
}

export default App;