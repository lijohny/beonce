
import React from 'react'
import SkillArea from './SkillArea'
import ResumeArea from './ResumeArea'
import Breadcrumb from '../common/Breadcrumb'
import FooterOne from '@/layouts/footers/FooterOne'
import HeaderOne from '@/layouts/headers/HeaderOne'

export default function About() {
  return (
    <>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Breadcrumb title="About Me" />
            <ResumeArea />
            <SkillArea />
          </main>
          <FooterOne />
        </div>
      </div>
    </>
  )
}
