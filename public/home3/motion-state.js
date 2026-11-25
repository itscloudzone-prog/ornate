window.ORNATE_MOTION_STATE = {
  "definitionVersion": "0.4.0",
  "revisionHistory": [
    "ornate-home3-arrival-v1"
  ],
  "sheetsById": {
    "Entrance": {
      "staticOverrides": {
        "byObject": {}
      },
      "sequence": {
        "type": "PositionalSequence",
        "length": 4.8,
        "subUnitsPerUnit": 60,
        "tracksByObject": {
          "Gate": {
            "trackData": {
              "Gate-draw": {
                "type": "BasicKeyframedTrack",
                "keyframes": [
                  {
                    "id": "Gate-draw-0",
                    "position": 0,
                    "value": 0,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Gate-draw-1",
                    "position": 1.8,
                    "value": 1,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Gate-draw-2",
                    "position": 4.8,
                    "value": 1,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  }
                ]
              },
              "Gate-open": {
                "type": "BasicKeyframedTrack",
                "keyframes": [
                  {
                    "id": "Gate-open-0",
                    "position": 0,
                    "value": 0,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Gate-open-1",
                    "position": 1.8,
                    "value": 0,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Gate-open-2",
                    "position": 4.3,
                    "value": 1,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Gate-open-3",
                    "position": 4.8,
                    "value": 1,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  }
                ]
              },
              "Gate-logo": {
                "type": "BasicKeyframedTrack",
                "keyframes": [
                  {
                    "id": "Gate-logo-0",
                    "position": 0,
                    "value": 0,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Gate-logo-1",
                    "position": 3.5,
                    "value": 0,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Gate-logo-2",
                    "position": 4.8,
                    "value": 1,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  }
                ]
              },
              "Gate-latch": {
                "type": "BasicKeyframedTrack",
                "keyframes": [
                  {
                    "id": "Gate-latch-0",
                    "position": 0,
                    "value": 1,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Gate-latch-1",
                    "position": 1.8,
                    "value": 1,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Gate-latch-2",
                    "position": 2.3,
                    "value": 0,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Gate-latch-3",
                    "position": 4.8,
                    "value": 0,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  }
                ]
              },
              "Gate-glow": {
                "type": "BasicKeyframedTrack",
                "keyframes": [
                  {
                    "id": "Gate-glow-0",
                    "position": 0,
                    "value": 0,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Gate-glow-1",
                    "position": 1.8,
                    "value": 0.1,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Gate-glow-2",
                    "position": 2.6,
                    "value": 1,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Gate-glow-3",
                    "position": 4.8,
                    "value": 0.25,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  }
                ]
              }
            },
            "trackIdByPropPath": {
              "[\"draw\"]": "Gate-draw",
              "[\"open\"]": "Gate-open",
              "[\"logo\"]": "Gate-logo",
              "[\"latch\"]": "Gate-latch",
              "[\"glow\"]": "Gate-glow"
            }
          }
        }
      }
    },
    "Hero": {
      "staticOverrides": {
        "byObject": {}
      },
      "sequence": {
        "type": "PositionalSequence",
        "length": 2.2,
        "subUnitsPerUnit": 60,
        "tracksByObject": {
          "Arrival": {
            "trackData": {
              "Arrival-reveal": {
                "type": "BasicKeyframedTrack",
                "keyframes": [
                  {
                    "id": "Arrival-reveal-0",
                    "position": 0,
                    "value": 0,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Arrival-reveal-1",
                    "position": 1.9,
                    "value": 1,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Arrival-reveal-2",
                    "position": 2.2,
                    "value": 1,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  }
                ]
              },
              "Arrival-camera": {
                "type": "BasicKeyframedTrack",
                "keyframes": [
                  {
                    "id": "Arrival-camera-0",
                    "position": 0,
                    "value": 1.12,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Arrival-camera-1",
                    "position": 2.2,
                    "value": 1,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  }
                ]
              }
            },
            "trackIdByPropPath": {
              "[\"reveal\"]": "Arrival-reveal",
              "[\"camera\"]": "Arrival-camera"
            }
          }
        }
      }
    },
    "Drawing": {
      "staticOverrides": {
        "byObject": {}
      },
      "sequence": {
        "type": "PositionalSequence",
        "length": 1.6,
        "subUnitsPerUnit": 60,
        "tracksByObject": {
          "Study": {
            "trackData": {
              "Study-reveal": {
                "type": "BasicKeyframedTrack",
                "keyframes": [
                  {
                    "id": "Study-reveal-0",
                    "position": 0,
                    "value": 0,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  },
                  {
                    "id": "Study-reveal-1",
                    "position": 1.6,
                    "value": 1,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      1,
                      0.5,
                      0
                    ]
                  }
                ]
              }
            },
            "trackIdByPropPath": {
              "[\"reveal\"]": "Study-reveal"
            }
          }
        }
      }
    },
    "Transformation": {
      "staticOverrides": {
        "byObject": {}
      },
      "sequence": {
        "type": "PositionalSequence",
        "length": 1,
        "subUnitsPerUnit": 60,
        "tracksByObject": {
          "Property": {
            "trackData": {
              "Property-reveal": {
                "type": "BasicKeyframedTrack",
                "keyframes": [
                  {
                    "id": "Property-reveal-0",
                    "position": 0,
                    "value": 0,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      0.5,
                      0.5,
                      0.5
                    ]
                  },
                  {
                    "id": "Property-reveal-1",
                    "position": 1,
                    "value": 100,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      0.5,
                      0.5,
                      0.5
                    ]
                  }
                ]
              }
            },
            "trackIdByPropPath": {
              "[\"reveal\"]": "Property-reveal"
            }
          }
        }
      }
    },
    "Scroll Gate": {
      "staticOverrides": {
        "byObject": {}
      },
      "sequence": {
        "type": "PositionalSequence",
        "length": 1,
        "subUnitsPerUnit": 60,
        "tracksByObject": {
          "Estate Gate": {
            "trackData": {
              "hero-gate-leftAngle": {
                "type": "BasicKeyframedTrack",
                "keyframes": [
                  {
                    "id": "hero-gate-leftAngle-0",
                    "position": 0,
                    "value": 0,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      0.5,
                      0.5,
                      0.5
                    ]
                  },
                  {
                    "id": "hero-gate-leftAngle-1",
                    "position": 1,
                    "value": 96,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      0.5,
                      0.5,
                      0.5
                    ]
                  }
                ]
              },
              "hero-gate-rightAngle": {
                "type": "BasicKeyframedTrack",
                "keyframes": [
                  {
                    "id": "hero-gate-rightAngle-0",
                    "position": 0,
                    "value": 0,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      0.5,
                      0.5,
                      0.5
                    ]
                  },
                  {
                    "id": "hero-gate-rightAngle-1",
                    "position": 1,
                    "value": -96,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      0.5,
                      0.5,
                      0.5
                    ]
                  }
                ]
              },
              "hero-gate-progress": {
                "type": "BasicKeyframedTrack",
                "keyframes": [
                  {
                    "id": "hero-gate-progress-0",
                    "position": 0,
                    "value": 0,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      0.5,
                      0.5,
                      0.5
                    ]
                  },
                  {
                    "id": "hero-gate-progress-1",
                    "position": 1,
                    "value": 1,
                    "connectedRight": true,
                    "handles": [
                      0.5,
                      0.5,
                      0.5,
                      0.5
                    ]
                  }
                ]
              }
            },
            "trackIdByPropPath": {
              "[\"leftAngle\"]": "hero-gate-leftAngle",
              "[\"rightAngle\"]": "hero-gate-rightAngle",
              "[\"progress\"]": "hero-gate-progress"
            }
          }
        }
      }
    }
  }
};
