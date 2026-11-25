/* Original Theatre.js choreography for Home 4. Runtime shared with Home 3;
   its upstream license is retained at ../home3/vendor/THEATRE-LICENSE.txt. */
(() => {
  "use strict";
  function sheet(objectName, length, properties) {
    const trackData = {},
      trackIdByPropPath = {};
    Object.entries(properties).forEach(([property, points]) => {
      const id = `${objectName}-${property}`;
      trackIdByPropPath[JSON.stringify([property])] = id;
      trackData[id] = {
        type: "BasicKeyframedTrack",
        keyframes: points.map(([position, value], index) => ({
          id: `${id}-${index}`,
          position,
          value,
          connectedRight: true,
          handles: [0.5, 0.5, 0.5, 0.5],
        })),
      };
    });
    return {
      staticOverrides: { byObject: {} },
      sequence: {
        type: "PositionalSequence",
        length,
        subUnitsPerUnit: 60,
        tracksByObject: { [objectName]: { trackData, trackIdByPropPath } },
      },
    };
  }
  window.ORNATE_HOME4_STATE = {
    definitionVersion: "0.4.0",
    revisionHistory: ["ornate-nocturne-v1"],
    sheetsById: {
      "The Opening": sheet("Iris", 2.8, {
        draw: [
          [0, 0],
          [1.15, 1],
          [2.8, 1],
        ],
        opening: [
          [0, 0],
          [1.3, 0],
          [1.6, 0.04],
          [2.3, 0.7],
          [2.8, 1],
        ],
        turn: [
          [0, -22],
          [1.3, 0],
          [2.8, 55],
        ],
      }),
      "The Product Study": sheet("Gate", 1, {
        zoom: [
          [0, 1],
          [0.15, 1],
          [0.75, 2.3],
          [1, 2.65],
        ],
        offsetX: [
          [0, 0],
          [0.15, 0],
          [1, -7],
        ],
        offsetY: [
          [0, 0],
          [0.15, 0],
          [1, 13],
        ],
        lettering: [
          [0, 1],
          [0.4, 0.1],
          [1, 0],
        ],
        detail: [
          [0, 0],
          [0.4, 0],
          [1, 1],
        ],
      }),
    },
  };
})();
