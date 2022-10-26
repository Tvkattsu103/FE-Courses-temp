import React from "react";
import Markup from "./markup/markup";

import "./App.css";

// Plugins Stylesheet
import "bootstrap/dist/css/bootstrap.min.css";

// Slick Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// React Modal Video
import "react-modal-video/css/modal-video.min.css";

// StyleSheet
import "./css/typography.css";
import "./css/shortcodes/shortcodes.css";
import "./css/style.css";
import "./css/color/color-1.css";

// Fonts
import "./vendors/fontawesome/css/font-awesome.min.css";
import "./vendors/flaticon/flaticon.css";
import "./vendors/line-awesome/css/line-awesome.min.css";
import "./vendors/themify/themify-icons.css";
import "./admin/scss/style.scss";

function App() {
    return (
        <div className="page-wraper">
            <Markup />
        </div>
    );
}

export default App;
