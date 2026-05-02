const mapEl = document.getElementById("mapElement");

mapEl.addEventListener("arcgisViewReadyChange", (evt) => {
  const { title, description, thumbnailUrl, avgRating } = mapEl.map.portalItem;
  document.querySelector("#header-title").heading = title;
  document.querySelector("#item-description").innerHTML = description;
  document.querySelector("#item-thumbnail").src = thumbnailUrl;
  document.querySelector("#item-rating").value = avgRating;

  let activeWidget;

  const handleActionBarClick = ({ target }) => {
    if (target.tagName !== "CALCITE-ACTION") {
      return;
    }

    if (activeWidget) {
      document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
      document.querySelector(`[data-panel-id=${activeWidget}]`).closed = true;
    }

    const nextWidget = target.dataset.actionId;
    if (nextWidget !== activeWidget) {
      document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
      document.querySelector(`[data-panel-id=${nextWidget}]`).closed = false;
      activeWidget = nextWidget;
      document.querySelector(`[data-panel-id=${nextWidget}]`).setFocus();
    } else {
      activeWidget = null;
    }
  };

  // Panel interaction
  const panelEls = document.querySelectorAll("calcite-panel");
  for (let i = 0; i < panelEls.length; i++) {
    panelEls[i].addEventListener("calcitePanelClose", () => {
      document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
      document.querySelector(`[data-action-id=${activeWidget}]`).setFocus();
      activeWidget = null;
    });
  }

  document
    .querySelector("calcite-action-bar")
    .addEventListener("click", handleActionBarClick);

  let actionBarExpanded = false;

  document.addEventListener("calciteActionBarToggle", (event) => {
    actionBarExpanded = !actionBarExpanded;
    const mapElCopyrightText = actionBarExpanded ? "125px" : "45px";
    mapEl.style.setProperty(
      "--arcgis-layout-overlay-space-left",
      `${mapElCopyrightText}`,
    );
  });

  document.getElementById("app-loader").hidden = true;
});

// Dark mode
    let darkModeDisabled = true;

    const updateDarkMode = () => {
      darkModeDisabled = !darkModeDisabled;
      document.getElementById("app-loader").hidden = false;
        // Calcite mode
        document.body.classList.toggle("calcite-mode-dark");
        // ArcGIS Maps SDK basemap
        mapElement.basemap = darkModeDisabled ? "gray-vector" : "dark-gray-vector";
        document.getElementById("app-loader").hidden = true;
      };

      document.querySelector("calcite-switch").addEventListener("calciteSwitchChange", updateDarkMode);
