import React from 'react'
import { useLocation } from 'react-router'
import StudyListRouting from '../studylist/StudyListRouting'
import ViewerLocalFileDataNEW from './ViewerLocalFileDataNEW'

export const Layout = (props) => {

    const location = useLocation()
  return (
    <div>
        {/* {location.pathname=='/Studylist' && <StudyListRouting/>}
        {location.pathname=='/DashboardPage/local' && <ViewerLocalFileDataNEW/>} */}
    </div>
  )
}
