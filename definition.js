Blockly.Blocks['xbot_sound_firstplay'] = {
  init: function() {
    this.jsonInit(
      {
        type: "xbot_sound_firstplay",
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
        colour: "#780779",
        tooltip: "",
        helpUrl: ""
      }
    );
  }
};

Blockly.Blocks['xbot_sound_playback'] = {
  init: function() {
    this.jsonInit(
      {
        type: "xbot_sound_playback",
        message0: "chế độ phát %1",
        args0: [
          {
            type: "field_dropdown",
            name: "mode",
            options: [
              [
                "lặp toàn bộ",
                "0x00"
              ],
              [
                "lặp trong thư mục",
                "0x01"
              ],
              [
                "lặp 1 bài",
                "0x02"
              ],
              [
                "ngẫu nhiên",
                "0x03"
              ]
            ]
          }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#780779",
        tooltip: "",
        helpUrl: ""
      }
    );
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
                {
                  "src": "https://i.ibb.co/jVQ9YVN/PLAY.gif",
                  "width": 50,
                  "height": 20,
                  "alt": "*"
                },
                "play"
              ],
              [
                {
                  "src": "https://i.ibb.co/sjd8ffw/pause.gif",
                  "width": 50,
                  "height": 20,
                  "alt": "*"
                },
                "pause"
              ],
              [
                {
                  "src": "https://i.ibb.co/Rj656B4/next.gif",
                  "width": 50,
                  "height": 20,
                  "alt": "*"
                },
                "playNext"
              ],
              [
                {
                  "src": "https://i.ibb.co/hXvT2Y5/pre.gif",
                  "width": 50,
                  "height": 20,
                  "alt": "*"
                },
                "playPrevious"
              ]
            ]
          }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#780779",
        tooltip: "",
        helpUrl: ""
      }
    );
  }
};


Blockly.Blocks['xbot_sound_vol'] = {
  init: function() {
    this.jsonInit(
      {
        type: "xbot_sound_vol",
        message0: "mở âm lượng %1 %%",
        args0: [
          {
            type: "input_value",
            name: "vol"
          }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#780779",
        tooltip: "",
        helpUrl: ""
      }
    );
  }
};

Blockly.Python['xbot_sound_firstplay'] = function(block) {
  // TODO: Assemble Python into code variable.
  var port = block.getFieldValue('port');
  Blockly.Python.definitions_['create_sound'] = 'sound = Sound(' + port + ')';
  var code = '';
  return code;
};

Blockly.Python['xbot_sound_playback'] = function(block) {
  var dropdown_mode = block.getFieldValue('mode');
  // TODO: Assemble Python into code variable.
  var code = '';
  return code;
};

Blockly.Python['xbot_sound_action'] = function(block) {
  var dropdown_action = block.getFieldValue('action');
  // TODO: Assemble Python into code variable.
  var code = '';
  return code;
};

Blockly.Python['xbot_sound_vol'] = function(block) {
  var number_vol = Blockly.Python.valueToCode(block, 'vol', Blockly.Python.ORDER_ATOMIC);
  // number_vol = number_vol/100;
  // TODO: Assemble Python into code variable.
  var code = '';
  return code;
};