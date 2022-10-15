import React, { useEffect } from 'react'
import SectionMenu from '../../components/SectionMenu'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom'
import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors'
import {
  makeSelectListMyCourse
}
  from '../Courses/selectors'
import {
  getListMyCourseStart
}
  from '../Courses/actions'

import reducer from '../Courses/reducer'
import saga from '../Courses/saga'
const key = "coursesRoot"
const stateStructor = createStructuredSelector({
  myCourse: makeSelectListMyCourse()
})

const Content = styled.section`
  padding: 50px 0px;
  width: 95%;
  margin: 0 auto;
`;

const Item = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: start;
    border: 2px solid gray;
    border-radius: 7px;
    width: 80%;
    height: 300px;
`
export default function MyCourses() {
  useInjectReducer(key, reducer)
  useInjectSaga(key, saga)
  const dispatch = useDispatch();
  const {
    myCourse
  } = useSelector(stateStructor)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const newToken = localStorage.getItem('token');
      dispatch(getListMyCourseStart({
        token: newToken
      }));
    }
  }, [dispatch])

  return (
    <div>
      <SectionMenu menuCurrent="My courses" />
      <Content>
        {myCourse && myCourse.length && myCourse.map(
          (cs, key) => {
            return (
              <Item key={key}>
                <img height='100%' src={cs?.thumbnail} alt='thumbnail' />
                <div style={{padding: '10px 20px'}}>
                  <h3>{cs?.course_name}</h3>
                  <div style={{fontSize: '20px', color: 'gray'}}>
                    <p>{cs.status} - {cs.end_date}</p>
                  </div>
                  <NavLink to={`/courses/${cs.course_id}`}>
                    <Button type="primary">Course Detail</Button>
                  </NavLink>
                </div>
              </Item>
            )
          }
        )}
      </Content>
    </div>
  )
}