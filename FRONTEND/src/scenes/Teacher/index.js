import React, { useEffect } from 'react'
import SectionMenu from '../../components/SectionMenu'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'
import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors'
import { createStructuredSelector } from 'reselect'
import {
  makeSelectListTeachers,
  makeSelectLoading,
}
  from './selectors'
import { useDispatch, useSelector } from "react-redux";
import {
  getListTeachersStart,
}
  from './actions'
import reducer from './reducer'
import saga from './saga'

const key = "teachersRoot"
const stateStructor = createStructuredSelector({
  teachers: makeSelectListTeachers(),
  loading: makeSelectLoading(),
})

const Content = styled.section`
  padding: 50px 0px;
  width: 95%;
  margin: 0 auto;
`;
const Card = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(104 111 122 / 40%);
  height: 150px;
  display: flex;
  justify-content: space-around;
  align-items: center
`
const Image = styled.img`
  display: block;
  position: relative;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 100px;
  max-width: 100px;
  border: 1px solid transparent;
  border-radius: 50%;
`
const TeacherList = (props) => {
  useInjectReducer(key, reducer)
  useInjectSaga(key, saga)
  const {
    teachers,
    loading,
  } = useSelector(stateStructor)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListTeachersStart())
  }, [dispatch]);

  return (
    <div>
      <SectionMenu menuCurrent="Teachers" />
      <Content>
        <div className="row">
          <div className="container">
            <div className='row'>
              {
                loading ? <div className="col-12">Loading ...</div> : (
                  teachers.map((item) => {
                    return (
                      <div className="col-6" key={item.user_id}>
                        <NavLink to={`/teachers/${item.user_id}`}>
                          <Card>
                            <Image
                              src='https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg'
                              alt="..." />
                            <div>
                              <h4 className="card-text" style={{ fontSize: '15px' }}>{item?.first_name + item?.last_name}</h4>
                              <p style={{ color: "#ab7a5f" }}>{item?.email}</p>
                            </div>
                          </Card>
                        </NavLink>
                      </div>
                    )
                  })
                )
              }
            </div>
          </div>
        </div>
      </Content>
    </div>
  )
}

export default TeacherList;
