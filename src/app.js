import React from "react";
import "../public/libs/potree/potree.css";
// import "../public/libs/jquery-ui/jquery-ui.min.css";
// import "../public/libs/openlayers3/ol.css";
// import "../public/libs/spectrum/spectrum.css";
// import "../public/libs/jstree/themes/mixed/style.css";

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, }}>
                {/* <div id="potree_render_area" style={{ backgroundImage: `url("https://st2.depositphotos.com/4112313/6977/v/600/depositphotos_69779337-stock-illustration-abstract-bright-blue-geometric-background.jpg")` }}></div> */}
                <div id="potree_render_area"></div>
                <div id="potree_sidebar_container"> </div>
            </div>
            // <div ref={this.potreeContainerDiv} className={"potree_container"}>
            //     <div id="potree_render_area" style={{ left: 300 }}></div>
            //     <div id="potree_sidebar_container">
            //         <div id="sidebar_root">
            //             <div>
            //                 <span className={"potree_sidebar_brand"}>
            //                     <a href="http://potree.org" target="_blank">potree.org</a>
            //                     <span style={{ marginTop: 0, marginBottom: 0, marginLeft: 3, marginRight: 3, color: '#9AA1A4' }}> - </span>
            //                     <a href="https://github.com/potree/potree" target="_blank">github</a>
            //                     <span style={{ marginTop: 0, marginBottom: 0, marginLeft: 3, marginRight: 3, color: '#9AA1A4' }}> - </span>
            //                     <a href="https://twitter.com/m_schuetz" target="_blank">twitter</a>
            //                     <span style={{ flexGrow: 1 }}></span>
            //                     <span style={{ color: '#9AA1A4', fontSize: '80%', fontWeight: 100 }}></span>
            //                 </span>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        )
    }

    componentDidMount() {
        window.viewer = new Potree.Viewer(document.getElementById("potree_render_area"));

        viewer.setEDLEnabled(false);
        viewer.setFOV(60);
        viewer.setPointBudget(1_000_000);
        viewer.loadSettingsFromURL();
        viewer.setBackground("skybox");

        viewer.setDescription("Point cloud courtesy of <a target='_blank' href='https://www.sigeom.ch/'>sigeom sa</a>");

        viewer.loadGUI(() => {
            viewer.setLanguage('en');
            $("#menu_tools").next().show();
            $("#menu_clipping").next().show();
            viewer.toggleSidebar();
        });

        // Load and add point cloud to scene
        Potree.loadPointCloud("./pointclouds/test/metadata.json", "test", e => {
            let scene = viewer.scene;
            let pointcloud = e.pointcloud;

            let material = pointcloud.material;
            material.size = 1;
            material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
            material.shape = Potree.PointShape.SQUARE;


            scene.addPointCloud(pointcloud);

            viewer.fitToScreen();
            // scene.view.setView(
            // 	[589974.341, 231698.397, 986.146],
            // 	[589851.587, 231428.213, 715.634],
            // );
        });
    }

    // componentDidMount() {

    //     // initialize Potree viewer
    //     const viewerElem = this.potreeContainerDiv.current

    //     const viewer = new Potree.Viewer(viewerElem);

    //     viewer.setEDLEnabled(true);
    //     viewer.setFOV(60);
    //     viewer.setPointBudget(1 * 1000 * 1000);
    //     viewer.setClipTask(Potree.ClipTask.SHOW_INSIDE);
    //     viewer.loadSettingsFromURL();

    //     viewer.setControls(viewer.orbitControls)

    //     console.log({ viewer })

    //     viewer.loadGUI(() => {
    //         viewer.setLanguage('en');
    //         document.getElementById("menu_appearance").next().show();
    //         viewer.toggleSidebar();
    //     });


    //     let url = "./pointclouds/test/metadata.json"
    //     Potree.loadPointCloud(url).then(e => {
    //         //let scene = viewer.scene;
    //         let pointcloud = e.pointcloud;
    //         let material = pointcloud.material;

    //         //material.activeAttributeName = "rgba";
    //         material.minSize = 2;
    //         material.pointSizeType = Potree.PointSizeType.FIXED

    //         viewer.scene.addPointCloud(pointcloud);

    //         viewer.fitToScreen();

    //         console.log("This is the url", url);
    //     }, e => console.err("ERROR: ", e));
    // }
}
