// import logo from './logo.svg';
import './Docs.css';
// import * as script from '@guildnews/embeds';

function Docs() {
  return (
    <div className="Docs">
      <div className="docs_module docs_ingameui">
        <div
          className="gw2MultiEmb"
          data-gw2-embed="aura"
          data-gw2-name="Chaos"
          data-gw2-size="32"
        ></div>
        <div
          className="gw2MultiEmb"
          data-gw2-embed="boon"
          data-gw2-name="Might"
          data-gw2-size="32"
          data-gw2-count={10}
        ></div>
        <div
          className="gw2MultiEmb"
          data-gw2-embed="condi"
          data-gw2-name="Bleeding"
          data-gw2-size="32"
          data-gw2-count={10}
        ></div>
        <div
          className="gw2MultiEmb"
          data-gw2-embed="control"
          data-gw2-name="Daze"
          data-gw2-size="32"
        ></div>
        <hr />
        <div
          className="gw2MultiEmb"
          data-gw2-embed="coins"
          data-gw2-value={1234567}
          data-gw2-size="32"
        ></div>
        <div
          className="gw2MultiEmb"
          data-gw2-embed="icon"
          data-gw2-name="ap"
          data-gw2-count={10}
          data-gw2-size="32"
        ></div>
        <div
          className="gw2MultiEmb"
          data-gw2-embed="items"
          data-gw2-id="75187"
          data-gw2-stats="Berserker"
          data-gw2-upgrades="86303, 86303"
          data-gw2-size="32"
        ></div>
        <div
          data-gw2-embed="skills"
          data-gw2-id="5548"
          data-gw2-size="32"
        ></div>
        <hr />
        <div
          className="gw2MultiEmb"
          data-gw2-embed="prof"
          data-gw2-name="Harbinger"
          data-gw2-size="32"
        ></div>
        <div
          className="gw2MultiEmb"
          data-gw2-embed="spec"
          data-gw2-id="42"
          data-gw2-size="32"
        ></div>
        <div
          className="gw2MultiEmb"
          data-gw2-embed="traits"
          data-gw2-id="1503"
          data-gw2-size="32"
        ></div>
        <div
          className="gw2MultiEmb"
          data-gw2-embed="traitline"
          data-gw2-id="41"
          data-gw2-traits="227, 214, 1672"
        ></div>
      </div>

      <div className="docs_module docs_ingamemap">
        <div className="docs_markerBlock">
          <h3>Dummy-Erfolg 1</h3>
          <div
            className="gw2mapMarker gw2MultiEmb"
            data-gw2-embed="MarkerButton"
            data-gw2map-mode="line"
            data-gw2map-marker="Punkt 1,37832,102136"
            data-gw2map-color="yellow"
          ></div>
          <h3>Dummy-Erfolg 2</h3>
          <div
            className="gw2mapMarker gw2MultiEmb"
            data-gw2-embed="MarkerButton"
            data-gw2map-mode="line"
            data-gw2map-marker="Punkt 1,37832,102136;,38212,102392;Punkt 3,37608,102568"
            data-gw2map-color="blue"
          ></div>
          <h3>Dummy-Erfolg 3</h3>
          <div
            className="gw2mapMarker gw2MultiEmb"
            data-gw2-embed="MarkerButton"
            data-gw2map-mode="line"
            data-gw2map-marker="Punkt 3,37608,102568"
            data-gw2map-color="yellow"
          ></div>
        </div>
        <div
          className="gw2MultiEmb docs_mapBlock"
          id="gw2mapRoot"
          data-gw2-embed="MapCont"
          data-gw2map-ids="1490,1438,1428"
          data-gw2map-debug="false"
        ></div>
      </div>
      {/* <script>{script}</script> */}
    </div>
  );
}

export default Docs;
