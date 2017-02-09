//
// Texecom Alarm Receiving Server
// Converted from
// Mike Stirling Python version
// Copyright 2016 Mike Stirling and Richard Collin

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var configFile =  process.argv[2];

var config = require('./' + configFile);

TexecomAlarm = require('./texecomalarm');

var alarm = new TexecomAlarm(config);
alarm.start();

alarm.on('connected', function(_state) {
   console.log("Texecom: Connection to Texecom alarm, state changed to", _state);
});

alarm.on('lineFailure', function(_state) {
   console.log("Texecom: Poll event received from Texecom alarm. Line Failure changed to" + _state);
});

alarm.on('batteryFailure', function(_state) {
   console.log("Texecom: Poll event received from Texecom alarm. Battery Failure changed to" + _state);
});

alarm.on('armed', function(_state) {
   console.log("Texecom: Poll event received from Texecom alarm. Armed flag changed to" + _state);
});

alarm.on('engineer', function(_state) {
   console.log("Texecom: Poll event received from Texecom alarm. Engineer flag changed to" + _state);
});

alarm.on('pollFlags', function(_flags) {
   console.log("Texecom: Poll event received from Texecom alarm. Flags=" + _flags);
});

alarm.on('message', function(_message) {
   console.log("Texecom Message:", _message);
});
