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
 
var util = require('util');

function ContactIdProtocol(_uName) {
   this.uName = _uName;

   this.QUALIFIERS = {
      1 : 'Event/Activated',
      3 : 'Restore/Secured',
      6 : 'Status'
   };

   this.EVENTS = {
      100: 'Medical',
      110: 'Fire',
      120: 'Panic',
      121: 'Duress',
      122: 'Silent Attack',
      123: 'Audible Attack',
      130: 'Intruder',
      131: 'Perimeter',
      132: 'Interior',
      133: '24 Hour',
      134: 'Entry/Exit',
      135: 'Day/Night',
      136: 'Outdoor',
      137: 'Zone Tamper',
      139: 'Confirmed Alarm',
      145: 'System Tamper',

      300: 'System Trouble',
      301: 'AC Lost',
      302: 'Low Battery',
      305: 'System Power Up',
      320: 'Mains Over-voltage',
      333: 'Network Failure',
      351: 'ATS Path Fault',
      354: 'Failed to Communicate',

      400: 'Arm/Disarm',
      401: 'Arm/Disarm by User',
      403: 'Automatic Arm/Disarm',
      406: 'Alarm Abort',
      407: 'Remote Arm/Disarm',
      408: 'Quick Arm',

      411: 'Download Start',
      412: 'Download End',
      441: 'Part Arm',

      457: 'Exit Error',
      459: 'Recent Closing',
      570: 'Zone Locked Out',

      601: 'Manual Test',
      602: 'Periodic Test',
      607: 'User Walk Test',

      623: 'Log Capacity Alert',
      625: 'Date/Time Changed',
      627: 'Program Mode Entry',
      628: 'Program Mode Exit',
   }
}

ContactIdProtocol.prototype.decodeMessage = function(_msg) {

   var message = { protocol: 'ContactID'};

   // Validate
   if (_msg.length != 16) {
      console.log(this.uName + ": Invalid message size " + _msg.length);
      return false;
   }

   if (_msg.slice(4,6) != '18' && _msg.slice(4,6) != '98') {
      console.log(this.uName + ": Invalid message type " + _msg.slice(4,6));
      return undefined;
   }

   message.accountNumber = _msg.slice(0,4).toString().replace(/A/g, '0');
   message.qualifier = _msg.slice(6,7);
   message.eventNum = _msg.slice(7,10);
   message.area = _msg.slice(10,12).toString();
   message.value = _msg.slice(12,15).toString();

   if (isNaN(message.qualifier) || isNaN(message.eventNum) || isNaN(message.area) || isNaN(message.value)) {
      console.log(this.uName + ": Unable to parse event!");
      return undefined;
   }


   var qualstr = (this.QUALIFIERS[message.qualifier] == undefined) ? '' : this.QUALIFIERS[message.qualifier];
   var eventstr = (this.EVENTS[message.eventNum] == undefined) ? ('Unknown Event '+message.eventNum) : this.EVENTS[message.eventNum];
   message.event = eventstr + qualstr;
   message.description = eventstr + qualstr;
   message.valueName = 'Zone/User';
   return message;
};

module.exports = exports = ContactIdProtocol;
