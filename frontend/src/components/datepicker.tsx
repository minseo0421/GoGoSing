import React, { useState, useEffect } from 'react';
import styled from './datapicker.module.css'

interface Props {
    onCalender:()=>void,
    birth:string|null,
    onBirth:(value:string)=>void,
}
const DatePicker: React.FC<Props> = ({onCalender,birth,onBirth}) => {
  const birthday = birth===null ? null :new Date(birth)
  const today = new Date()
  const [year, setYear] = useState<number>(birthday!==null ? birthday.getFullYear():today.getFullYear());
  const [month, setMonth] = useState<number>(birthday!==null ? birthday.getMonth()+1:today.getMonth()+1);
  const [day, setDay] = useState<number>(birthday!==null ? birthday.getDate():today.getDate());

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>, type: string) => {
    const delta = e.deltaY;

    if (type === 'year') {
      if (delta > 0 && year === today.getFullYear()) {
        // 가장 큰 값 이후로 스크롤 무시
        return;
      }
      if (delta < 0 && year === 1900) {
        // 가장 작은 값 이후로 스크롤 무시
        return;
      }
      const newYear = Math.min(2023, Math.max(1, year + (delta > 0 ? 1 : -1)));
      setYear(newYear);
      setMonth(1)
      setDay(1)
    } else if (type === 'month') {
      if (delta > 0 && month === 12) {
        // 가장 큰 값 이후로 스크롤 무시
        return;
      }
      if (delta > 0 && year===today.getFullYear() && month === today.getMonth()+1) {
        //2023년도일 경우 오늘까지로 제한
        return;
      }
      if (delta < 0 && month === 1) {
        // 가장 작은 값 이후로 스크롤 무시
        return;
      }
      const newMonth = month + (delta > 0 ? 1 : -1);
      if (newMonth < 1) {
        setYear((prevYear) => prevYear - 1);
        setMonth(12);
      } else if (newMonth > 12) {
        setYear((prevYear) => prevYear + 1);
        setMonth(1);
      } else {
        setMonth(newMonth);
      }
      setDay(1)
    } else if (type === 'day') {
      const daysInSelectedMonth = getDaysInMonth(year, month);
      if (delta > 0 && day === daysInSelectedMonth) {
        // 가장 큰 값 이후로 스크롤 무시
        return;
      }
      if (delta > 0 && year===today.getFullYear() && month === today.getMonth()+1 && day===today.getDate()) {
        //2023년도일 경우 오늘까지로 제한
        return;
      }
      if (delta < 0 && day === 1) {
        // 가장 작은 값 이후로 스크롤 무시
        return;
      }
      const newDay = day + (delta > 0 ? 1 : -1);
      if (newDay < 1) {
        if (month === 1) {
          setYear((prevYear) => prevYear - 1);
          setMonth(12);
          setDay(getDaysInMonth(year - 1, 12));
        } else {
          setMonth((prevMonth) => prevMonth - 1);
          setDay(getDaysInMonth(year, month - 1));
        }
      } else if (newDay > daysInSelectedMonth) {
        if (month === 12) {
          setYear((prevYear) => prevYear + 1);
          setMonth(1);
          setDay(1);
        } else {
          setMonth((prevMonth) => prevMonth + 1);
          setDay(1);
        }
      } else {
        setDay(newDay);
      }
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const generateValuesArray = (value: number) => {
    // -2, -1, +1, +2 값만 반환하도록 수정
    return [value - 2, value - 1, value, value + 1, value + 2];
  };

  const yearRef = React.createRef<HTMLDivElement>();
  const monthRef = React.createRef<HTMLDivElement>();
  const dayRef = React.createRef<HTMLDivElement>();



  useEffect(() => {
    const daysInSelectedMonth = getDaysInMonth(year, month);
    if (day > daysInSelectedMonth) {
      setDay(daysInSelectedMonth);
    }
  }, [year, month,day]);



  return (
    <div className={styled.calender}>
     <div style={{height:'10%', display:'flex', justifyContent:'space-between',margin:'10px 20px'}}>
      <span>생년월일</span>
      <button style={{}} onClick={()=>{onBirth(`${year}-${month}-${day}`); onCalender()}}>완료</button>
    </div>
    <div className={styled.input_calender}>

      <div style={{width:'50%'}} onWheel={(e) => handleScroll(e, 'year')} ref={yearRef}>
        {generateValuesArray(year).map((value, index) => (
            <div key={index} className={`${value === year ? styled.selected : null}`}>
            {/* 범위 내에서만 출력 */}
            <>
              {value === 1899 || value === 1898 || value===today.getFullYear()+1 || value===today.getFullYear()+2  ? <p>　</p>:null}
              {value >= 1900 && value <= today.getFullYear() && (
                <p onClick={()=>{setYear(value)}}>
                  {value}
                </p>
              )}
            </>
          </div>
        ))}
      </div>
      <div style={{width:'25%'}} onWheel={(e) => handleScroll(e, 'month')} ref={monthRef}>
        {generateValuesArray(month).map((value, index) => (
            <div key={index} className={`${value===month ? styled.selected:null}`}>
            {/* 범위 내에서만 출력 */}
            {year === today.getFullYear() ? 
            <>
              {value === 0 || value === -1 || value === 13 || value === 14 ? <p>　</p>:null}
              {value >= 1 && value <= today.getMonth()+1 && (
                <p onClick={()=>{setMonth(value)}} >
                  {value.toString().padStart(2, '0')}
                </p>
              )}
            </>
            :
            <>
              {value === 0 || value === -1 || value === 13 || value === 14? <p>　</p>:null}
              {value >= 1 && value <= 12 && (
                <p onClick={()=>{setMonth(value)}}>
                  {value.toString().padStart(2, '0')}
                </p>
              )}
            </>
            }
          </div>
        ))}
      </div>
      <div style={{width:'25%'}} onWheel={(e) => handleScroll(e, 'day')} ref={dayRef}>
        {generateValuesArray(day).map((value, index) => (
            <div key={index} className={`${value === day ? styled.selected : null}`}>
            {/* 범위 내에서만 출력 */}
            {year === today.getFullYear() && month === today.getMonth()+1 ?
                <>
                  {value === 0 || value === -1 || value === today.getDate()+1 || value === today.getDate()+2 ? <p>　</p>:null}
                  {value >= 1 && value <= today.getDate() && (
                    <p onClick={()=>{setDay(value)}}>
                      {value.toString().padStart(2, '0')}
                    </p>
                  )}
                </>
            :
            <>
              {value === 0 || value === -1 || value === today.getDate()+1 || value === today.getDate()+2 ? <p>　</p>:null}
              {value >= 1 && value <= getDaysInMonth(year, month) && (
                <p onClick={()=>{setDay(value)}}>
                  {value.toString().padStart(2, '0')}
                </p>
              )}
            </>
            }
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default DatePicker;
