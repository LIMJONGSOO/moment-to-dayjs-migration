function wrapDayjs(date?: any, format?: string, locale?: any, strict?: boolean) {
  let obj;
  if(!date) {
    obj = dayjs();
  } else if(!format || typeof(date) !== 'string') {
    obj = dayjs(date);
    if (!obj.isValid()) {
      // IOS - dayjs("2026.01.05. 09:10") 오류 발생
      const msg = `dayjs unValid value : ${date}`;
      console.log(msg);
      console.trace();
    }
  } else {
    try {
      if(strict ===  undefined) {
        obj = dayjs(date, format, locale);
      } else {
        obj = dayjs(date, format, locale, strict);
      }

      if (!obj.isValid()) {
        if(format.indexOf('MMM') > -1) {
          const locale = dayjs.locale();
          const monthsList = '01_02_03_04_05_06_07_08_09_10_11_12'.split('_');
          if(locale === 'vi') {
            if(format.indexOf('MMMM') > -1) {
              const months = 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_');
              for(let i=11; i>=0; i--) {
                if(date.indexOf(months[i]) > -1) {
                  date = date.replace(months[i], monthsList[i]);
                  format = format.replace('MMMM', 'MM');
                  break;
                }
              }
            } else {
              const monthsShort =  'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_');
              for(let i=11; i>=0; i--) {
                if(date.indexOf(monthsShort[i]) > -1) {
                  date = date.replace(monthsShort[i], monthsList[i]);
                  format = format.replace('MMM', 'MM');
                  break;
                }
              }
            }
          } else if(locale === 'ru' && format.indexOf('MMMM') === -1) {
            const monthsShort = 'янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек'.split('_');
            for(let i=11; i>=0; i--) {
              if(date.indexOf(monthsShort[i]) > -1) {
                date = date.replace(monthsShort[i], monthsList[i]);
                format = format.replace('MMM', 'MM');
                break;
              }
            }
          }

          if(strict ===  undefined) {
            obj = dayjs(date, format, locale);
          } else {
            obj = dayjs(date, format, locale, strict);
          }

          if(obj.isValid()) {
            return obj;
          }
        }
        const msg = `dayjs unmatch format value : ${date} \nformat: ${format}}`
        console.log(msg);
        console.trace();

        const newDate = date.replace(/[^(0-9)T]/g, '');
        const newFormat = format.replace(/[^(a-z)]/gi, '');

        if (newDate.length === newFormat.length) {
          if (strict === undefined) {
            obj = dayjs(newDate, newFormat, locale);
          } else {
            obj = dayjs(newDate, newFormat, locale, strict);
          }
        } else if (newDate.length > 0 && newFormat.length > 0) {
          if (strict === undefined) {
            obj = dayjs(newDate.substring(0, newFormat.length), newFormat.substring(0, newDate.length), locale);
          } else {
            obj = dayjs(newDate.substring(0, newFormat.length), newFormat.substring(0, newDate.length), locale, strict);
          }
        } else {
          obj = dayjs(newDate);
        }
      }
    } catch (e) {
      obj = dayjs(date);
    }
  }

  return obj;
}

const nameList = {'Africa/Abidjan':'GMT','Africa/Accra':'GMT','Africa/Addis_Ababa':'EAT','Africa/Algiers':'CET','Africa/Asmera':'EAT','Africa/Bamako':'GMT','Africa/Bangui':'WAT','Africa/Banjul':'GMT','Africa/Bissau':'GMT','Africa/Blantyre':'CAT','Africa/Brazzaville':'WAT','Africa/Bujumbura':'CAT','Africa/Cairo':'EEST','Africa/Ceuta':'CEST','Africa/Conakry':'GMT','Africa/Dakar':'GMT','Africa/Dar_es_Salaam':'EAT','Africa/Djibouti':'EAT','Africa/Douala':'WAT','Africa/Freetown':'GMT','Africa/Gaborone':'CAT','Africa/Harare':'CAT','Africa/Johannesburg':'SAST','Africa/Juba':'CAT','Africa/Kampala':'EAT','Africa/Khartoum':'CAT','Africa/Kigali':'CAT','Africa/Kinshasa':'WAT','Africa/Lagos':'WAT','Africa/Libreville':'WAT','Africa/Lome':'GMT','Africa/Luanda':'WAT','Africa/Lubumbashi':'CAT','Africa/Lusaka':'CAT','Africa/Malabo':'WAT','Africa/Maputo':'CAT','Africa/Maseru':'SAST','Africa/Mbabane':'SAST','Africa/Mogadishu':'EAT','Africa/Monrovia':'GMT','Africa/Nairobi':'EAT','Africa/Ndjamena':'WAT','Africa/Niamey':'WAT','Africa/Nouakchott':'GMT','Africa/Ouagadougou':'GMT','Africa/Porto-Novo':'WAT','Africa/Sao_Tome':'GMT','Africa/Tripoli':'EET','Africa/Tunis':'CET','Africa/Windhoek':'CAT','America/Adak':'HDT','America/Anchorage':'AKDT','America/Anguilla':'AST','America/Antigua':'AST','America/Aruba':'AST','America/Bahia_Banderas':'CST','America/Barbados':'AST','America/Belize':'CST','America/Blanc-Sablon':'AST','America/Boise':'MDT','America/Cambridge_Bay':'MDT','America/Cancun':'EST','America/Cayman':'EST','America/Chicago':'CDT','America/Chihuahua':'CST','America/Ciudad_Juarez':'MDT','America/Coral_Harbour':'EST','America/Costa_Rica':'CST','America/Creston':'MST','America/Curacao':'AST','America/Danmarkshavn':'GMT','America/Dawson':'MST','America/Dawson_Creek':'MST','America/Denver':'MDT','America/Detroit':'EDT','America/Dominica':'AST','America/Edmonton':'MDT','America/El_Salvador':'CST','America/Fort_Nelson':'MST','America/Glace_Bay':'ADT','America/Goose_Bay':'ADT','America/Grand_Turk':'EDT','America/Grenada':'AST','America/Guadeloupe':'AST','America/Guatemala':'CST','America/Halifax':'ADT','America/Havana':'CDT','America/Hermosillo':'MST','America/Indiana/Knox':'CDT','America/Indiana/Marengo':'EDT','America/Indiana/Petersburg':'EDT','America/Indiana/Tell_City':'CDT','America/Indiana/Vevay':'EDT','America/Indiana/Vincennes':'EDT','America/Indiana/Winamac':'EDT','America/Indianapolis':'EDT','America/Inuvik':'MDT','America/Iqaluit':'EDT','America/Jamaica':'EST','America/Juneau':'AKDT','America/Kentucky/Monticello':'EDT','America/Kralendijk':'AST','America/Los_Angeles':'PDT','America/Louisville':'EDT','America/Lower_Princes':'AST','America/Managua':'CST','America/Marigot':'AST','America/Martinique':'AST','America/Matamoros':'CDT','America/Mazatlan':'MST','America/Menominee':'CDT','America/Merida':'CST','America/Metlakatla':'AKDT','America/Mexico_City':'CST','America/Moncton':'ADT','America/Monterrey':'CST','America/Montserrat':'AST','America/Nassau':'EDT','America/New_York':'EDT','America/Nome':'AKDT','America/North_Dakota/Beulah':'CDT','America/North_Dakota/Center':'CDT','America/North_Dakota/New_Salem':'CDT','America/Ojinaga':'CDT','America/Panama':'EST','America/Phoenix':'MST','America/Port-au-Prince':'EDT','America/Port_of_Spain':'AST','America/Puerto_Rico':'AST','America/Rankin_Inlet':'CDT','America/Regina':'CST','America/Resolute':'CDT','America/Santo_Domingo':'AST','America/Sitka':'AKDT','America/St_Barthelemy':'AST','America/St_Johns':'NDT','America/St_Kitts':'AST','America/St_Lucia':'AST','America/St_Thomas':'AST','America/St_Vincent':'AST','America/Swift_Current':'CST','America/Tegucigalpa':'CST','America/Thule':'ADT','America/Tijuana':'PDT','America/Toronto':'EDT','America/Tortola':'AST','America/Vancouver':'PDT','America/Whitehorse':'MST','America/Winnipeg':'CDT','America/Yakutat':'AKDT','Antarctica/Macquarie':'AEST','Antarctica/McMurdo':'NZST','Arctic/Longyearbyen':'CEST','Asia/Beirut':'EEST','Asia/Calcutta':'IST','Asia/Famagusta':'EEST','Asia/Gaza':'EEST','Asia/Hebron':'EEST','Asia/Hong_Kong':'HKT','Asia/Jakarta':'WIB','Asia/Jayapura':'WIT','Asia/Jerusalem':'IDT','Asia/Karachi':'PKT','Asia/Macau':'CST','Asia/Makassar':'WITA','Asia/Manila':'PST','Asia/Nicosia':'EEST','Asia/Pontianak':'WIB','Asia/Pyongyang':'KST','Asia/Seoul':'KST','Asia/Shanghai':'CST','Asia/Taipei':'CST','Asia/Tokyo':'JST','Atlantic/Bermuda':'ADT','Atlantic/Canary':'WEST','Atlantic/Faeroe':'WEST','Atlantic/Madeira':'WEST','Atlantic/Reykjavik':'GMT','Atlantic/St_Helena':'GMT','Australia/Adelaide':'ACST','Australia/Brisbane':'AEST','Australia/Broken_Hill':'ACST','Australia/Darwin':'ACST','Australia/Hobart':'AEST','Australia/Lindeman':'AEST','Australia/Melbourne':'AEST','Australia/Perth':'AWST','Australia/Sydney':'AEST','Europe/Amsterdam':'CEST','Europe/Andorra':'CEST','Europe/Athens':'EEST','Europe/Belgrade':'CEST','Europe/Berlin':'CEST','Europe/Bratislava':'CEST','Europe/Brussels':'CEST','Europe/Bucharest':'EEST','Europe/Budapest':'CEST','Europe/Busingen':'CEST','Europe/Chisinau':'EEST','Europe/Copenhagen':'CEST','Europe/Dublin':'IST','Europe/Gibraltar':'CEST','Europe/Guernsey':'BST','Europe/Helsinki':'EEST','Europe/Isle_of_Man':'BST','Europe/Jersey':'BST','Europe/Kaliningrad':'EET','Europe/Kiev':'EEST','Europe/Kirov':'MSK','Europe/Lisbon':'WEST','Europe/Ljubljana':'CEST','Europe/London':'BST','Europe/Luxembourg':'CEST','Europe/Madrid':'CEST','Europe/Malta':'CEST','Europe/Mariehamn':'EEST','Europe/Monaco':'CEST','Europe/Moscow':'MSK','Europe/Oslo':'CEST','Europe/Paris':'CEST','Europe/Podgorica':'CEST','Europe/Prague':'CEST','Europe/Riga':'EEST','Europe/Rome':'CEST','Europe/San_Marino':'CEST','Europe/Sarajevo':'CEST','Europe/Simferopol':'MSK','Europe/Skopje':'CEST','Europe/Sofia':'EEST','Europe/Stockholm':'CEST','Europe/Tallinn':'EEST','Europe/Tirane':'CEST','Europe/Vaduz':'CEST','Europe/Vatican':'CEST','Europe/Vienna':'CEST','Europe/Vilnius':'EEST','Europe/Volgograd':'MSK','Europe/Warsaw':'CEST','Europe/Zagreb':'CEST','Europe/Zurich':'CEST','Indian/Antananarivo':'EAT','Indian/Comoro':'EAT','Indian/Mayotte':'EAT','Pacific/Auckland':'NZST','Pacific/Guam':'ChST','Pacific/Honolulu':'HST','Pacific/Midway':'SST','Pacific/Pago_Pago':'SST','Pacific/Saipan':'ChST'}

/*
dayjs.format('z');
 */
function getTimezoneShortName(timezone?: string): string {
  let shortName: string = '';
  try {
    if(!timezone) timezone = dayjs.tz.guess();
    shortName = this.nameList[timezone];
    if(!shortName){
      shortName = myDayjs().tz(shortName).format('ZZ').replace('00', '');
    }

  }catch(error) {}

  return shortName;
}
