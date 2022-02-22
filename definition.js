Blockly.Blocks['xbot_sound_start'] = {
  init: function() {
    this.jsonInit(
      {
        type: "xbot_sound_start",
        message0: "khởi động máy nghe nhạc cổng %1",
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            type: "field_dropdown",
            name: "port",
            options: [
              ["1", "0"],
              ["2", "1"],
              ["3", "2"],
              ["4", "3"],
              ["5", "4"],
              ["6", "5"],
            ],
          },],
        colour: "#00A06B",
        tooltip: "",
        helpUrl: ""
      }
    );
  },
  getDeveloperVars: function() {
    return ['sound'];
  }
};

Blockly.Blocks['xbot_sound_action'] = {
  init: function() {
    this.jsonInit(
      {
        type: "xbot_sound_action",
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "action",
            options: [
              [
                "Phát nhạc",
                "play"
              ],
              [
                "Tạm dừng",
                "pause"
              ],
              [
                "Dừng phát nhạc",
                "stop"
              ],
              [
                "Phát bài nhạc kế tiếp",
                "play_next"
              ],
              [
                "Phát bài nhạc trước đó",
                "play_previous"
              ]
            ]
          }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#00A06B",
        tooltip: "",
        helpUrl: ""
      }
    );
  },
  getDeveloperVars: function() {
    return ['sound'];
  }
};


Blockly.Blocks['xbot_sound_vol'] = {
  init: function() {
    this.jsonInit(
      {
        type: "xbot_sound_vol",
        message0: "mở âm lượng %1 (0-30)",
        args0: [
          {
            type: "input_value",
            name: "vol"
          }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#00A06B",
        tooltip: "",
        helpUrl: ""
      }
    );
  },
  getDeveloperVars: function() {
    return ['sound'];
  }
};

Blockly.Blocks['xbot_sound_playtrack'] = {
  init: function() {
    this.jsonInit(
      {
        type: "xbot_sound_playtrack",
        message0: "phát bài nhạc số %1",
        args0: [
          {
            type: "input_value",
            name: "track"
          }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#00A06B",
        tooltip: "",
        helpUrl: ""
      }
    );
  },
  getDeveloperVars: function() {
    return ['sound'];
  }
};

// Python Code

Blockly.Python['xbot_sound_start'] = function(block) {
  // TODO: Assemble Python into code variable.
  var port = block.getFieldValue('port');
  Blockly.Python.definitions_['import_sound_player'] = 'from sound_player_jq8400 import JQ8400';
  Blockly.Python.definitions_['create_sound'] = 'sound = JQ8400(' + port + ')';
  var code = '';
  return code;
};

Blockly.Python['xbot_sound_action'] = function(block) {
  var dropdown_action = block.getFieldValue('action');
  // TODO: Assemble Python into code variable.
  var code = 'sound.' + dropdown_action + '()\n';
  return code;
};

Blockly.Python['xbot_sound_vol'] = function(block) {
  var number_vol = Blockly.Python.valueToCode(block, 'vol', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'sound.set_volume(' + number_vol + ')\n';
  return code;
};

Blockly.Python['xbot_sound_playtrack'] = function(block) {
  var number_track = Blockly.Python.valueToCode(block, 'track', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'sound.play_track(' + number_track + ')\n';
  return code;
};