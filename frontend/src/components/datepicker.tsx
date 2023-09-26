import React, { useState, useEffect } from 'react';
import styled from './datapicker.module.css'

interface Props {
    onCalendar:()=>void,
    birth:string|null,
    onBirth:(value:string)=>void,
}
const DatePicker: React.FC<Props> = ({onCalendar,birth,onBirth}) => {
  const birthday = birth===null ? null :new Date(birth)
  const today = new Date()
  const [year, setYear] = useState<number>(birthday!==null ? birthday.getFullYear():today.getFullYear());
  const [month, setMonth] = useState<number>(birthday!==null ? birthday.getMonth()+1:today.getMonth()+1);
  const [day, setDay] = useState<number>(birthday!==null ? birthday.getDate():today.getDate());
  const handleTouchScroll = (e: React.TouchEvent<HTMLDivElement>, type: string) => {
    // 터치 스크롤 방향을 확인합니다.
    const touchStartY = e.touches[0].clientY;
    const touchMoveY = e.touches[0].clientY;
  
    // 위로 스크롤
    if (touchMoveY < touchStartY) {
      handleScrollUp(type);
    }
    // 아래로 스크롤
    else if (touchMoveY > touchStartY) {
      handleScrollDown(type);
    }
  };

  const handleScrollUp = (type: string) => {
    if (type === 'year') {
      // 연도를 증가시키는 처리
      const newYear = Math.min(2023, Math.max(1900, year + 1));
      setYear(newYear);
      
      // 연도가 현재 연도와 같으면 월과 일에 대한 처리
      if (newYear === today.getFullYear()) {
        if (month > today.getMonth() + 1) {
          setMonth(1);
          setDay(1);
        } else if (month === today.getMonth() + 1 && day > today.getDate()) {
          setDay(1);
        }
      }
    } else if (type === 'month') {
      // 월을 증가시키는 처리
      const newMonth = month + 1;
      if (newMonth > 12) {
        setYear((prevYear) => prevYear + 1);
        setMonth(1);
      } else {
        setMonth(newMonth);
      }
    } else if (type === 'day') {
      // 일을 증가시키는 처리
      const daysInSelectedMonth = getDaysInMonth(year, month);
      const newDay = day + 1;
      if (newDay > daysInSelectedMonth) {
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
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

// 터치 시작 시
const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
  setTouchStartY(e.touches[0].clientY);
};

// 터치 종료 시
const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
  if (touchStartY !== null) {
    const touchEndY = e.changedTouches[0].clientY;

    // 터치 시작과 종료 지점을 비교하여 스크롤 방향을 확인
    if (touchEndY < touchStartY) {
      // 아래로 스크롤
      handleScrollDown('day'); // 원하는 스크롤 방향에 따라 변경
    } else if (touchEndY > touchStartY) {
      // 위로 스크롤
      handleScrollUp('day'); // 원하는 스크롤 방향에 따라 변경
    }

    // 터치 시작 지점 초기화
    setTouchStartY(null);
  }
};
  const handleScrollDown = (type: string) => {
    if (type === 'year') {
      // 연도를 감소시키는 처리
      const newYear = Math.min(2023, Math.max(1900, year - 1));
      setYear(newYear);
      
      // 연도가 현재 연도와 같으면 월과 일에 대한 처리
      if (newYear === today.getFullYear()) {
        if (month > today.getMonth() + 1) {
          setMonth(1);
          setDay(1);
        } else if (month === today.getMonth() + 1 && day > today.getDate()) {
          setDay(1);
        }
      }
    } else if (type === 'month') {
      // 월을 감소시키는 처리
      const newMonth = month - 1;
      if (newMonth < 1) {
        setYear((prevYear) => prevYear - 1);
        setMonth(12);
      } else {
        setMonth(newMonth);
      }
    } else if (type === 'day') {
      // 일을 감소시키는 처리
      const newDay = day - 1;
      if (newDay < 1) {
        if (month === 1) {
          setYear((prevYear) => prevYear - 1);
          setMonth(12);
          setDay(getDaysInMonth(year - 1, 12));
        } else {
          setMonth((prevMonth) => prevMonth - 1);
          setDay(getDaysInMonth(year, month - 1));
        }
      } else {
        setDay(newDay);
      }
    }
  };
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
      if (newYear===today.getFullYear()){
        if (month > today.getMonth()+1) {
          setMonth(1)
          setDay(1)
        }
        else {
          if (day > today.getDate()) {
            setDay(1)
          }
        }
      }
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
      } else if (newMonth > 12) {
        setYear((prevYear) => prevYear + 1);
      } else {
        setMonth(newMonth);
      }
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
          // setMonth(1);
          // setDay(1);
        } else {
          setMonth((prevMonth) => prevMonth + 1);
          // setDay(1);
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
      <button style={{}} onClick={()=>{onBirth(`${year}-${month}-${day}`); onCalendar()}}>완료</button>
    </div>
    <div className={styled.input_calender}>

      <div style={{width:'50%'}} onWheel={(e) => handleScroll(e, 'year')} onTouchMove={(e) => handleTouchScroll(e, 'year')}  ref={yearRef}  onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
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
      <div style={{width:'25%'}} onWheel={(e) => handleScroll(e, 'month')}  onTouchMove={(e) => handleTouchScroll(e, 'month')}  ref={monthRef}  onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
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
      <div style={{width:'25%'}} onWheel={(e) => handleScroll(e, 'day')}  onTouchMove={(e) => handleTouchScroll(e, 'day')}  ref={dayRef}  onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {generateValuesArray(day).map((value, index) => (
            <div key={index} className={`${value === day ? styled.selected : null}`}>
            {/* 범위 내에서만 출력 */}
            {year === today.getFullYear() && month === today.getMonth()+1 ?
                <>
                  {value === 0 || value === -1 ? <p>　</p>:null}
                  {value >= 1 && value <= today.getDate() && (
                    <p onClick={()=>{setDay(value)}}>
                      {value.toString().padStart(2, '0')}
                    </p>
                  )}
                </>
            :
            <>
              {value === 0 || value === -1 ? <p>　</p>:null}
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
