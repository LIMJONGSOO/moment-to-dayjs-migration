function myDayjs(date?: any, format?: string, locale?: any, strict?: boolean) {
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
