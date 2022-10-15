import React, { useEffect } from 'react'
import SectionMenu from '../../components/SectionMenu'
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router';
import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors'
import {
  makeSelectListTeachers,
}
  from '../Teacher/selectors';

import {
  getListTeachersStart,
}
  from '../Teacher/actions'
import reducer from '../Teacher/reducer'
import saga from '../Teacher/saga'
import { useDispatch, useSelector } from "react-redux";

const stateStructor = createStructuredSelector({
  teachers: makeSelectListTeachers(),
})

const Content = styled.section`
  padding: 50px 0px;
  width: 95%;
  margin: 0 auto;
`;

const key = "teachersRoot"
const TeacherDetail = (props) => {
  useInjectReducer(key, reducer)
  useInjectSaga(key, saga)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Tada');
    dispatch(getListTeachersStart())
  }, [dispatch]);

  const {
    teachers,
  } = useSelector(stateStructor)
  
  const { id } = useParams();
  const teacher = teachers.filter(item => item.user_id === id);

  return (
    <div>
      <SectionMenu menuCurrent="Teacher Detail" />
      <Content>
        <div className="row">
          <div className="container">
            <div className='row'>
              <div className='col-6'>
                <h1>{teacher[0]?.first_name + teacher[0]?.last_name}</h1>
                <span>{teacher[0]?.email} - </span>
                <span>{teacher[0]?.phone_number}</span>
                <h3 style={{marginTop: '10px'}}>{teacher[0]?.address}</h3>
              </div>
              <div className='col-6'>
                <img
                  src='https://daotao.ai/media/filer_public_thumbnails/filer_public/ef/7f/ef7f67f6-d091-48f0-b3fb-f0bd707501b8/letanhung.png__200x200_crop_subsampling-2_upscale.png'
                  alt="..." />
              </div>
            </div>
          </div>
        </div>
      </Content>
    </div>
  )
}

export default TeacherDetail;
