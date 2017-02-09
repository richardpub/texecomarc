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

function SIAProtocol(_name) {
   this.name = _name;

   this.EVENTS = {
      'AA': ["Alarm - Panel Substitution", "An attempt to substitute an alternate alarm panel for a secure panel has been made", "Condition Number"],
      'AB': ["Abort", "An event message was not sent due to User action", "Zone"],
      'AN': ["Analog Restoral", "An analog fire sensor has been restored to normal operation", "Zone"],
      'AR': ["AC Restoral", "AC power has been restored", ""],
      'AS': ["Analog Service", "An analog fire sensor needs to be cleaned or calibrated", "Zone"],
      'AT': ["AC Trouble", "AC power has been failed", ""],
      'BA': ["Burglary Alarm", "Burglary zone has been violated while armed", "Zone"],
      'BB': ["Burglary Bypass", "Burglary zone has been bypassed", "Zone"],
      'BC': ["Burglary Cancel", "Alarm has been cancelled by authorized user", "User"],
      'BD': ["Swinger Trouble", "A non-fire zone has been violated after a Swinger Shutdown on the zone", "Zone"],
      'BE': ["Swinger Trouble Restore", "A non-fire zone restores to normal from a Swinger Trouble state", "Zone"],
      'BG': ["Unverified Event - Burglary", "A point assigned to a Cross Point group has gone into alarm but the Cross Point remained normal", "Zone"],
      'BH': ["Burglary Alarm Restore", "Alarm condition eliminated", "Zone"],
      'BJ': ["Burglary Trouble Restore", "Trouble condition eliminated", "Zone"],
      'BM': ["Burglary Alarm -  Cross Point", "Burglary alarm w/cross point also in alarm - alarm verified", "Zone"],
      'BR': ["Burglary Restoral", "Alarm/trouble condition has been eliminated", "Zone"],
      'BS': ["Burglary Supervisory", "Unsafe intrusion detection system condition", "Zone"],
      'BT': ["Burglary Trouble", "Burglary zone disabled by fault", "Zone"],
      'BU': ["Burglary Unbypass", "Zone bypass has been removed", "Zone"],
      'BV': ["Burglary Verified", "A burglary alarm has occurred and been verified within programmed conditions. [zone or point not sent)", "Area"],
      'BX': ["Burglary Test", "Burglary zone activated during testing", "Zone"],
      'BZ': ["Missing Supervision", "A non-fire Supervisory point has gone missing", "Zone"],
      'CA': ["Automatic Closing", "System armed automatically", "Area"],
      'CD': ["Closing Delinquent", "The system has not been armed for a programmed amount of time", "Area"],
      'CE': ["Closing Extend", "Extend closing time", "User"],
      'CF': ["Forced Closing", "System armed, some zones not ready", "User"],
      'CG': ["Close Area", "System has been partially armed", "Area"],
      'CI': ["Fail to Close", "An area has not been armed at the end of the closing window", "Area"],
      'CJ': ["Late Close", "An area was armed after the closing window", "User"],
      'CK': ["Early Close", "An area was armed before the closing window", "User"],
      'CL': ["Closing Report", "System armed, normal", "User"],
      'CM': ["Missing Alarm - Recent Closing", "A point has gone missing within 2 minutes of closing", "Zone"],
      'CO': ["Command Sent", "A command has been sent to an expansion/peripheral device", "Condition Number"],
      'CP': ["Automatic Closing", "System armed automatically", "User"],
      'CQ': ["Remote Closing", "The system was armed from a remote location", "User"],
      'CR': ["Recent Closing", "An alarm occurred within five minutes after the system was closed", "User"],
      'CS': ["Closing Keyswitch", "Account has been armed by keyswitch", "Zone"],
      'CT': ["Late to Open", "System was not disarmed on time", "Area"],
      'CW': ["Was Force Armed", "Header for a force armed session, forced point msgs may follow", "Area"],
      'CX': ["Custom Function Executed", "The panel has executed a preprogrammed set of instructions", "Custom Function"],
      'CZ': ["Point Closing", "A point, as opposed to a whole area or account, has closed", "Zone"],
      'DA': ["Card Assigned", "An access ID has been added to the controller", "User"],
      'DB': ["Card Deleted", "An access ID has been deleted from the controller", "User"],
      'DC': ["Access Closed", "Access to all users prohibited", "Door"],
      'DD': ["Access Denied", "Access denied, unknown code", "Door"],
      'DE': ["Request to Enter", "An access point was opened via a Request to Enter device", "Door"],
      'DF': ["Door Forced", "Door opened without access request", "Door"],
      'DG': ["Access Granted", "Door access granted", "Door"],
      'DH': ["Door Left Open - Restoral", "An access point in a Door Left Open state has restored", "Door"],
      'DI': ["Access Denied - Passback", "Access denied because credential has not exited area before attempting to re-enter same area", "Door"],
      'DJ': ["Door Forced - Trouble", "An access point has been forced open in an unarmed area", "Door"],
      'DK': ["Access Lockout", "Access denied, known code", "Door"],
      'DL': ["Door Left Open - Alarm", "An open access point when open time expired in an armed area", "Door"],
      'DM': ["Door Left Open - Trouble", "An open access point when open time expired in an unarmed area", "Door"],
      'DN': ["Door Left Open [non-alarm, non-trouble)", "An access point was open when the door cycle time expired", "Door"],
      'DO': ["Access Open", "Access to authorized users allowed", "Door"],
      'DP': ["Access Denied - Unauthorized Time", "An access request was denied because the request is occurring outside the user's authorized time window[s)", "Door"],
      'DQ': ["Access Denied Unauthorized Arming State", "An access request was denied because the user was not authorized in this area when the area was armed", "Door"],
      'DR': ["Door Restoral", "Access alarm/trouble condition eliminated", "Door"],
      'DS': ["Door Station", "Identifies door for next report", "Door"],
      'DT': ["Access Trouble", "Access system trouble", ""],
      'DU': ["Dealer ID", "Dealer ID number", "Dealer ID"],
      'DV': ["Access Denied Unauthorized Entry Level", "An access request was denied because the user is not authorized in this area", "Door"],
      'DW': ["Access Denied - Interlock", "An access request was denied because the doors associated Interlock point is open", "Door"],
      'DX': ["Request to Exit", "An access point was opened via a Request to Exit device", "Door"],
      'DY': ["Door Locked", "The door's lock has been engaged", "Door"],
      'DZ': ["Access Denied - Door Secured", "An access request was denied because the door has been placed in an Access Closed state", "Door"],
      'EA': ["Exit Alarm", "An exit zone remained violated at the end of the exit delay period", "Zone"],
      'EE': ["Exit Error", "An exit zone remained violated at the end of the exit delay period", "User"],
      'EJ': ["Expansion Tamper Restore", "Expansion device tamper restoral", "Device"],
      'EM': ["Expansion Device Missing", "Expansion device missing", "Device"],
      'EN': ["Expansion Missing Restore", "Expansion device communications re-established", "Device"],
      'ER': ["Expansion Restoral", "Expansion device trouble eliminated", "Expander"],
      'ES': ["Expansion Device Tamper", "Expansion device enclosure tamper", "Device"],
      'ET': ["Expansion Trouble", "Expansion device trouble", "Expander"],
      'EX': ["External Device Condition", "A specific reportable condition is detected on an external device", "Device"],
      'EZ': ["Missing Alarm - Exit Error", "A point remained missing at the end of the exit delay period", "Zone"],
      'FA': ["Fire Alarm", "Fire condition detected", "Zone"],
      'FB': ["Fire Bypass", "Zone has been bypassed", "Zone"],
      'FC': ["Fire Cancel", "A Fire Alarm has been cancelled by an authorized person", "Zone"],
      'FG': ["Unverified Event - Fire", "A point assigned to a Cross Point group has gone into alarm but the Cross Point remained normal", "Zone"],
      'FH': ["Fire Alarm Restore", "Alarm condition eliminated", "Zone"],
      'FI': ["Fire Test Begin", "The transmitter area's fire test has begun", "Area"],
      'FJ': ["Fire Trouble Restore", "Trouble condition eliminated", "Zone"],
      'FK': ["Fire Test End", "The transmitter area's fire test has ended", "Area"],
      'FL': ["Fire Alarm Silenced", "The fire panel's sounder was silenced by command", "Zone"],
      'FM': ["Fire Alarm - Cross Point", "Fire Alarm with Cross Point also in alarm verifying the Fire Alarm", "Zone"],
      'FQ': ["Fire Supervisory Trouble Restore", "A fire supervisory zone that was in trouble condition has now restored to normal", "Zone"],
      'FR': ["Fire Restoral", "Alarm/trouble condition has been eliminated", "Zone"],
      'FS': ["Fire Supervisory", "Unsafe fire detection system condition", "Zone"],
      'FT': ["Fire Trouble", "Zone disabled by fault", "Zone"],
      'FU': ["Fire Unbypass", "Bypass has been removed", "Zone"],
      'FV': ["Fire Supervision Restore", "A fire supervision zone that was in alarm has restored to normal", "Zone"],
      'FW': ["Fire Supervisory Trouble", "A fire supervisory zone is now in a trouble condition", "Zone"],
      'FX': ["Fire Test", "Fire zone activated during test", "Zone"],
      'FY': ["Missing Fire Trouble", "A fire point is now logically missing", "Zone"],
      'FZ': ["Missing Fire Supervision", "A Fire Supervisory point has gone missing", "Zone"],
      'GA': ["Gas Alarm", "Gas alarm condition detected", "Zone"],
      'GB': ["Gas Bypass", "Zone has been bypassed", "Zone"],
      'GH': ["Gas Alarm Restore", "Alarm condition eliminated", "Zone"],
      'GJ': ["Gas Trouble Restore", "Trouble condition eliminated", "Zone"],
      'GR': ["Gas Restoral", "Alarm/trouble condition has been eliminated", "Zone"],
      'GS': ["Gas Supervisory", "Unsafe gas detection system condition", "Zone"],
      'GT': ["Gas Trouble", "Zone disabled by fault", "Zone"],
      'GU': ["Gas Unbypass", "Bypass has been removed", "Zone"],
      'GX': ["Gas Test", "Zone activated during test", "Zone"],
      'HA': ["Holdup Alarm", "Silent alarm, user under duress", "Zone"],
      'HB': ["Holdup Bypass", "Zone has been bypassed", "Zone"],
      'HH': ["Holdup Alarm Restore", "Alarm condition eliminated", "Zone"],
      'HJ': ["Holdup Trouble Restore", "Trouble condition eliminated", "Zone"],
      'HR': ["Holdup Restoral", "Alarm/trouble condition has been eliminated", "Zone"],
      'HS': ["Holdup Supervisory", "Unsafe holdup system condition", "Zone"],
      'HT': ["Holdup Trouble", "Zone disabled by fault", "Zone"],
      'HU': ["Holdup Unbypass", "Bypass has been removed", "Zone"],
      'IA': ["Equipment Failure Condition", "A specific, reportable condition is detected on a device", "Zone"],
      'IR': ["Equipment Fail - Restoral", "The equipment condition has been restored to normal", "Zone"],
      'JA': ["User Code Tamper", "Too many unsuccessful attempts have been made to enter a user ID", "Area"],
      'JD': ["Date Changed", "The date was changed in the transmitter/receiver", "User"],
      'JH': ["Holiday Changed", "The transmitter's holiday schedule has been changed", "User"],
      'JK': ["Latchkey Alert", "A designated user passcode has not been entered during a scheduled time window", "User"],
      'JL': ["Log Threshold", "The transmitter's log memory has reached its threshold level", ""],
      'JO': ["Log Overflow", "The transmitter's log memory has overflowed", ""],
      'JP': ["User On Premises", "A designated user passcode has been used to gain access to the premises.", "User"],
      'JR': ["Schedule Executed", "An automatic scheduled event was executed", "Area"],
      'JS': ["Schedule Changed", "An automatic schedule was changed", "User"],
      'JT': ["Time Changed", "The time was changed in the transmitter/receiver", "User"],
      'JV': ["User Code Changed", "A user's code has been changed", "User"],
      'JX': ["User Code Deleted", "A user's code has been removed", "User"],
      'JY': ["User Code Added", "A user's code has been added", "User"],
      'JZ': ["User Level Set", "A user's authority level has been set", "User"],
      'KA': ["Heat Alarm", "High temperature detected on premise", "Zone"],
      'KB': ["Heat Bypass", "Zone has been bypassed", "Zone"],
      'KH': ["Heat Alarm Restore", "Alarm condition eliminated", "Zone"],
      'KJ': ["Heat Trouble Restore", "Trouble condition eliminated", "Zone"],
      'KR': ["Heat Restoral", "Alarm/trouble condition has been eliminated", "Zone"],
      'KS': ["Heat Supervisory", "Unsafe heat detection system condition", "Zone"],
      'KT': ["Heat Trouble", "Zone disabled by fault", "Zone"],
      'KU': ["Heat Unbypass", "Bypass has been removed", "Zone"],
      'LB': ["Local Program", "Begin local programming", ""],
      'LD': ["Local Program Denied", "Access code incorrect", ""],
      'LE': ["Listen-in Ended", "The listen-in session has been terminated", ""],
      'LF': ["Listen-in Begin", "The listen-in session with the RECEIVER has begun", ""],
      'LR': ["Phone Line Restoral", "Phone line restored to service", "Line"],
      'LS': ["Local Program Success", "Local programming successful", ""],
      'LT': ["Phone Line Trouble", "Phone line trouble report", "Line"],
      'LU': ["Local Program Fail", "Local programming unsuccessful", ""],
      'LX': ["Local Programming Ended", "A local programming session has been terminated", ""],
      'MA': ["Medical Alarm", "Emergency assistance request", "Zone"],
      'MB': ["Medical Bypass", "Zone has been bypassed", "Zone"],
      'MH': ["Medical Alarm Restore", "Alarm condition eliminated", "Zone"],
      'MI': ["Message", "A canned message is being sent", "Message"],
      'MJ': ["Medical Trouble Restore", "Trouble condition eliminated", "Zone"],
      'MR': ["Medical Restoral", "Alarm/trouble condition has been eliminated", "Zone"],
      'MS': ["Medical Supervisory", "Unsafe system condition exists", "Zone"],
      'MT': ["Medical Trouble", "Zone disabled by fault", "Zone"],
      'MU': ["Medical Unbypass", "Bypass has been removed", "Zone"],
      'NA': ["No Activity", "There has been no zone activity for a programmed amount of time", "Zone"],
      'NC': ["Network Condition", "A communications network has a specific reportable condition", "Network"],
      'NF': ["Forced Perimeter Arm", "Some zones/points not ready", "Area"],
      'NL': ["Perimeter Armed", "An area has been perimeter armed", "Area"],
      'NM': ["Perimeter Armed, User Defined", "A user defined area has been perimeter armed", "Area"],
      'NR': ["Network Restoral", "A communications network has returned to normal operation", "Network"],
      'NS': ["Activity Resumed", "A zone has detected activity after an alert", "Zone"],
      'NT': ["Network Failure", "A communications network has failed", "Network"],
      'OA': ["Automatic Opening", "System has disarmed automatically", "Area"],
      'OC': ["Cancel Report", "Untyped zone cancel", "User"],
      'OG': ["Open Area", "System has been partially disarmed", "Area"],
      'OH': ["Early to Open from Alarm", "An area in alarm was disarmed before the opening window", "User"],
      'OI': ["Fail to Open", "An area has not been armed at the end of the opening window", "Area"],
      'OJ': ["Late Open", "An area was disarmed after the opening window", "User"],
      'OK': ["Early Open", "An area was disarmed before the opening window", "User"],
      'OL': ["Late to Open from Alarm", "An area in alarm was disarmed after the opening window", "User"],
      'OP': ["Opening Report", "Account was disarmed", "User"],
      'OQ': ["Remote Opening", "The system was disarmed from a remote location", "User"],
      'OR': ["Disarm From Alarm", "Account in alarm was reset/disarmed", "User"],
      'OS': ["Opening Keyswitch", "Account has been disarmed by keyswitch", "Zone"],
      'OT': ["Late To Close", "System was not armed on time", "User"],
      'OU': ["Output State - Trouble", "An output on a peripheral device or NAC is not functioning", "Output"],
      'OV': ["Output State - Restore", "An output on a peripheral device or NAC is back to normal operation", "Output"],
      'OZ': ["Point Opening", "A point, rather than a full area or account, disarmed", "Zone"],
      'PA': ["Panic Alarm", "Emergency assistance request, manually activated", "Zone"],
      'PB': ["Panic Bypass", "Panic zone has been bypassed", "Zone"],
      'PH': ["Panic Alarm Restore", "Alarm condition eliminated", "Zone"],
      'PJ': ["Panic Trouble Restore", "Trouble condition eliminated", "Zone"],
      'PR': ["Panic Restoral", "Alarm/trouble condition has been eliminated", "Zone"],
      'PS': ["Panic Supervisory", "Unsafe system condition exists", "Zone"],
      'PT': ["Panic Trouble", "Zone disabled by fault", "Zone"],
      'PU': ["Panic Unbypass", "Panic zone bypass has been removed", "Zone"],
      'QA': ["Emergency Alarm", "Emergency assistance request", "Zone"],
      'QB': ["Emergency Bypass", "Zone has been bypassed", "Zone"],
      'QH': ["Emergency Alarm Restore", "Alarm condition has been eliminated", "Zone"],
      'QJ': ["Emergency Trouble Restore", "Trouble condition has been eliminated", "Zone"],
      'QR': ["Emergency Restoral", "Alarm/trouble condition has been eliminated", "Zone"],
      'QS': ["Emergency Supervisory", "Unsafe system condition exists", "Zone"],
      'QT': ["Emergency Trouble", "Zone disabled by fault", "Zone"],
      'QU': ["Emergency Unbypass", "Bypass has been removed", "Zone"],
      'RA': ["Remote Programmer  Call Failed", "Transmitter failed to communicate with the remote programmer", ""],
      'RB': ["Remote Program Begin", "Remote programming session initiated", ""],
      'RC': ["Relay Close", "A relay has energized", "Relay"],
      'RD': ["Remote Program Denied", "Access passcode incorrect", ""],
      'RN': ["Remote Reset", "A TRANSMITTER was reset via a remote programmer", ""],
      'RO': ["Relay Open", "A relay has de-energized", "Relay"],
      'RP': ["Automatic Test", "Automatic communication test report", ""],
      'RR': ["Power Up", "System lost power, is now restored", ""],
      'RS': ["Remote Program Success", "Remote programming successful", ""],
      'RT': ["Data Lost", "Dialer data lost, transmission error", "Line"],
      'RU': ["Remote Program Fail", "Remote programming unsuccessful", ""],
      'RX': ["Manual Test", "Manual communication test report", "User"],
      'RY': ["Test Off Normal", "Test signal[s) indicates abnormal condition[s) exist", "Zone"],
      'SA': ["Sprinkler Alarm", "Sprinkler flow condition exists", "Zone"],
      'SB': ["Sprinkler Bypass", "Sprinkler zone has been bypassed", "Zone"],
      'SC': ["Change of State", "An expansion/peripheral device is reporting a new condition or state change", "Condition Number"],
      'SH': ["Sprinkler Alarm Restore", "Alarm condition eliminated", "Zone"],
      'SJ': ["Sprinkler Trouble Restore", "Trouble condition eliminated", "Zone"],
      'SR': ["Sprinkler Restoral", "Alarm/trouble condition has been eliminated", "Zone"],
      'SS': ["Sprinkler Supervisory", "Unsafe sprinkler system condition", "Zone"],
      'ST': ["Sprinkler Trouble", "Zone disabled by fault", "Zone"],
      'SU': ["Sprinkler Unbypass", "Sprinkler zone bypass has been removed", "Zone"],
      'TA': ["Tamper Alarm", "Alarm equipment enclosure opened", "Zone"],
      'TB': ["Tamper Bypass", "Tamper detection has been bypassed", "Zone"],
      'TC': ["All Points Tested", "All point tested", ""],
      'TE': ["Test End", "Communicator restored to operation", ""],
      'TH': ["Tamper Alarm Restore", "An Expansion Device's tamper switch restores to normal from an Alarm state", ""],
      'TJ': ["Tamper Trouble Restore", "An Expansion Device's tamper switch restores to normal from a Trouble state", ""],
      'TP': ["Walk Test Point", "This point was tested during a Walk Test", "Zone"],
      'TR': ["Tamper Restoral", "Alarm equipment enclosure has been closed", "Zone"],
      'TS': ["Test Start", "Communicator taken out of operation", ""],
      'TT': ["Tamper Trouble", "Equipment enclosure opened in disarmed state", "Zone"],
      'TU': ["Tamper Unbypass", "Tamper detection bypass has been removed", "Zone"],
      'TW': ["Area Watch Start", "Area watch feature has been activated", ""],
      'TX': ["Test Report", "An unspecified [manual or automatic) communicator test", ""],
      'TZ': ["Area Watch End", "Area watch feature has been deactivated", ""],
      'UA': ["Untyped Zone Alarm", "Alarm condition from zone of unknown type", "Zone"],
      'UB': ["Untyped Zone Bypass", "Zone of unknown type has been bypassed", "Zone"],
      'UG': ["Unverified Event - Untyped", "A point assigned to a Cross Point group has gone into alarm but the Cross Point remained normal", "Zone"],
      'UH': ["Untyped Alarm Restore", "Alarm condition eliminated", "Zone"],
      'UJ': ["Untyped Trouble Restore", "Trouble condition eliminated", "Zone"],
      'UR': ["Untyped Zone Restoral", "Alarm/trouble condition eliminated from zone of unknown type", "Zone"],
      'US': ["Untyped Zone Supervisory", "Unsafe condition from zone of unknown type", "Zone"],
      'UT': ["Untyped Zone Trouble", "Trouble condition from zone of unknown type", "Zone"],
      'UU': ["Untyped Zone Unbypass", "Bypass on zone of unknown type has been removed", "Zone"],
      'UX': ["Undefined", "An undefined alarm condition has occurred", ""],
      'UY': ["Untyped Missing Trouble", "A point or device which was not armed is now logically missing", "Zone"],
      'UZ': ["Untyped Missing Alarm", "A point or device which was armed is now logically missing", "Zone"],
      'VI': ["Printer Paper In", "TRANSMITTER or RECEIVER paper in", "Printer"],
      'VO': ["Printer Paper Out", "TRANSMITTER or RECEIVER paper out", "Printer"],
      'VR': ["Printer Restore", "TRANSMITTER or RECEIVER trouble restored", "Printer"],
      'VT': ["Printer Trouble", "TRANSMITTER or RECEIVER trouble", "Printer"],
      'VX': ["Printer Test", "TRANSMITTER or RECEIVER test", "Printer"],
      'VY': ["Printer Online", "RECEIVER'S printer is now online", ""],
      'VZ': ["Printer Offline", "RECEIVER'S printer is now offline", ""],
      'WA': ["Water Alarm", "Water detected at protected premises", "Zone"],
      'WB': ["Water Bypass", "Water detection has been bypassed", "Zone"],
      'WH': ["Water Alarm Restore", "Water alarm condition eliminated", "Zone"],
      'WJ': ["Water Trouble Restore", "Water trouble condition eliminated", "Zone"],
      'WR': ["Water Restoral", "Water alarm/trouble condition has been eliminated", "Zone"],
      'WS': ["Water Supervisory", "Water unsafe water detection system condition", "Zone"],
      'WT': ["Water Trouble", "Water zone disabled by fault", "Zone"],
      'WU': ["Water Unbypass", "Water detection bypass has been removed", "Zone"],
      'XA': ["Extra Account Report", "CS RECEIVER has received an event from a non-existent account", ""],
      'XE': ["Extra Point", "Panel has sensed an extra point not specified for this site", "Zone"],
      'XF': ["Extra RF Point", "Panel has sensed an extra RF point not specified for this site", "Zone"],
      'XH': ["RF Interference Restoral", "A radio device is no longer detecting RF Interference", "Receiver"],
      'XI': ["Sensor Reset", "A user has reset a sensor", "Zone"],
      'XJ': ["RF Receiver Tamper Restoral", "A Tamper condition at a premises RF Receiver has been restored", "Receiver"],
      'XL': ["Low Received Signal Strength", "The RF signal strength of a reported event is below minimum level", "Receiver"],
      'XM': ["Missing Alarm - Cross Point", "Missing Alarm verified by Cross Point in Alarm [or missing)", "Zone"],
      'XQ': ["RF Interference", "A radio device is detecting RF Interference", "Receiver"],
      'XR': ["Transmitter Battery Restoral", "Low battery has been corrected", "Zone"],
      'XS': ["RF Receiver Tamper", "A Tamper condition at a premises receiver is detected", "Receiver"],
      'XT': ["Transmitter Battery Trouble", "Low battery in wireless transmitter", "Zone"],
      'XW': ["Forced Point", "A point was forced out of the system at arm time", "Zone"],
      'XX': ["Fail to Test", "A specific test from a panel was not received", ""],
      'YA': ["Bell Fault", "A trouble condition has been detected on a Local Bell, Siren, or Annunciator", ""],
      'YB': ["Busy Seconds", "Percent of time receiver's line card is on-line", "Line Card"],
      'YC': ["Communications Fail", "RECEIVER and TRANSMITTER", ""],
      'YD': ["Receiver Line Card Trouble", "A line card identified by the passed address is in trouble", "Line Card"],
      'YE': ["Receiver Line Card Restored", "A line card identified by the passed address is restored", "Line Card"],
      'YF': ["Parameter Checksum Fail", "System data corrupted", ""],
      'YG': ["Parameter Changed", "A TRANSMITTER'S parameters have been changed", ""],
      'YH': ["Bell Restored", "A trouble condition has been restored on a Local Bell, Siren, or Annunciator", ""],
      'YI': ["Overcurrent Trouble", "An Expansion Device has detected an overcurrent condition", ""],
      'YJ': ["Overcurrent Restore", "An Expansion Device has restored from an overcurrent condition", ""],
      'YK': ["Communications Restoral", "TRANSMITTER has resumed communication with a RECEIVER", ""],
      'YM': ["System Battery Missing", "TRANSMITTER/RECEIVER battery is missing", ""],
      'YN': ["Invalid Report", "TRANSMITTER has sent a packet with invalid data", ""],
      'YO': ["Unknown Message", "An unknown message was received from automation or the printer", ""],
      'YP': ["Power Supply Trouble", "TRANSMITTER/RECEIVER has a problem with the power supply", ""],
      'YQ': ["Power Supply Restored", "TRANSMITTER'S/RECEIVER'S power supply has been restored", ""],
      'YR': ["System Battery Restoral", "Low battery has been corrected", ""],
      'YS': ["Communications Trouble", "RECEIVER and TRANSMITTER", ""],
      'YT': ["System Battery Trouble", "Low battery in control/communicator", ""],
      'YU': ["Diagnostic Error", "An expansion/peripheral device is reporting a diagnostic error", "Condition Number"],
      'YW': ["Watchdog Reset", "The TRANSMITTER created an internal reset", ""],
      'YX': ["Service Required", "A TRANSMITTER/RECEIVER needs service", ""],
      'YY': ["Status Report", "This is a header for an account status report transmission", ""],
      'YZ': ["Service Completed", "Required TRANSMITTER / RECEIVER service completed", ""],
      'ZA': ["Freeze Alarm", "Low temperature detected at premises", "Zone"],
      'ZB': ["Freeze Bypass", "Low temperature detection has been bypassed", "Zone"],
      'ZH': ["Freeze Alarm Restore", "Alarm condition eliminated", "Zone"],
      'ZJ': ["Freeze Trouble Restore", "Trouble condition eliminated", "Zone"],
      'ZR': ["Freeze Restoral", "Alarm/trouble condition has been eliminated", "Zone"],
      'ZS': ["Freeze Supervisory", "Unsafe freeze detection system condition", "Zone"],
      'ZT': ["Freeze Trouble", "Zone disabled by fault", "Zone"],
      'ZU': ["Freeze Unbypass", "Low temperature detection bypass removed", "Zone"],
   };
}

SIAProtocol.prototype.parseRecord = function(_record) {
   var parsedRecord = {};
   parsedRecord.type = _record[0] & 0xc0;
   parsedRecord.payloadlength = _record[0] & 0x3f;

   if ((parsedRecord.payloadlength + 2) > _record.length) {
      console.log(this.name + ': Record parse error ' + parsedRecord.payloadlength + 2 + " " + _record.length);
      return null;
   }
   parsedRecord.payloadType = _record[1];
   parsedRecord.payload = _record.slice(2,2 + parsedRecord.payloadlength)

   if ((3 + parsedRecord.payloadlength) == _record.length) {
      parsedRecord.nextrec = null;
   }
   else {
      parsedRecord.nextrec = _record.slice(3 + parsedRecord.payloadlength);
   }

   var check = 0xff;

   var buf = _record.slice(0,3+parsedRecord.payloadlength);
   for (var a = 0; a < buf.length; a++) {
      check ^= buf[a];
   }

   if (check != 0) {
      console.log(this.name + ': Check byte error ', + check);
      return null;
   }

   if (parsedRecord.type == 0xc0) {
      return parsedRecord;
   }
   else {
      return { payloadType: '', payload: '', nextrec: parsedRecord.nextrec };
   }

}

SIAProtocol.prototype.decodeMessage = function(_msg) {
   var incomingMsg = _msg;
   var message = { protocol: 'SIA' };

   while (incomingMsg) {
      var parsedRecord = this.parseRecord(incomingMsg);

      if (parsedRecord == null) {
         break;
      }
      else {
         incomingMsg = parsedRecord.nextrec;
      }

      if (parsedRecord.payloadType == 35) {
         message.accountNumber = parsedRecord.payload.toString();
      }
      else if (parsedRecord.payloadType == 65) {
         message.extraText = parsedRecord.payload;
      }
      else if (parsedRecord.payloadType == 78) {
         message.area = String.fromCharCode(parsedRecord.payload[2]);
         message.eventNum = parsedRecord.payload.slice(3,5);
         message.value = parsedRecord.payload.slice(5,8).toString();

         if (isNaN(message.area) || isNaN(message.value)) {
            console.log(this.name + ": Payload parse error");
         }
         else {
            var eventTriple = this.EVENTS[message.eventNum];

            if (eventTriple != undefined) {
               message.event = eventTriple[0];
               message.description = eventTriple[1];
               message.valueName = eventTriple[2];
            }
            else {
               console.log(this.name + ": Unknown event code " + message.eventNum);
            }
         }
      }
   }
   return message;
};

module.exports = exports = SIAProtocol;
