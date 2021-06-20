import React, { Component }  from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { MDBRow, MDBCol } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faCheck, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import TimelineColors from '../resources/TimelineColors';

const Experience = (props) => {

    const { navId } = props;

    return (
        <div className="experience" id={ navId }>
            <MDBRow>
                <MDBCol>
                    <div className="d-flex justify-content-center">
                        <h1><b>Kokemus</b></h1>
                        <br />
                    </div>
                </MDBCol>
            </MDBRow>
            <MDBRow className="justify-content-center">
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#613B44', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  #613B44' }}
                        date="2014 - jatkuu"
                        iconStyle={{ background: TimelineColors.WORK_ICON_BG, color: '#fff' }}
                        icon={<FontAwesomeIcon icon={faBriefcase} size="lg" />}
                    >
                        <h3 className="vertical-timeline-element-title">Tanssinopettaja</h3>
                        <h4 className="vertical-timeline-element-subtitle">Turku</h4>
                        <p>
                        Jos haluu kirjottaa jotain niin siitä vaaan tähän hei.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="2021"
                        iconStyle={{ background: TimelineColors.WORK_ICON_BG, color: '#fff' }}
                        icon={<FontAwesomeIcon icon={faBriefcase} size="lg" />}
                    >
                        <h3 className="vertical-timeline-element-title">Kuntavaalit</h3>
                        <h4 className="vertical-timeline-element-subtitle">Vihreät, Turku</h4>
                        <p>
                        Jos haluu kirjottaa jotain niin siitä vaaan tähän hei.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="20XX - 20XX"
                        iconStyle={{ background: TimelineColors.WORK_ICON_BG, color: '#fff' }}
                        icon={<FontAwesomeIcon icon={faBriefcase} size="lg" />}
                    >
                        <h3 className="vertical-timeline-element-title">Sihteeri</h3>
                        <h4 className="vertical-timeline-element-subtitle">Kärjäoikeus, Turku</h4>
                        <p>
                        Jos haluu kirjottaa jotain niin siitä vaaan tähän hei.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="20XX - 20XX"
                        iconStyle={{ background: TimelineColors.WORK_ICON_BG, color: '#fff' }}
                        icon={<FontAwesomeIcon icon={faBriefcase} size="lg" />}
                    >
                        <h3 className="vertical-timeline-element-title">Myyjä</h3>
                        <h4 className="vertical-timeline-element-subtitle">S-Market, Loimaa</h4>
                        <p>
                        User Experience, Visual Design
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        date="2014 - 2017"
                        iconStyle={{ background: TimelineColors.EDUCATION_ICON_BG, color: '#fff' }}
                        icon={<FontAwesomeIcon icon={faGraduationCap} size="lg" />}
                    >
                        <h3 className="vertical-timeline-element-title">Tradenomi</h3>
                        <h4 className="vertical-timeline-element-subtitle">Turun ammattikorkeakoulu</h4>
                        <p>
                        Jos haluu kirjottaa jotain niin siitä vaaan tähän hei.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        date="2013"
                        iconStyle={{ background: TimelineColors.EDUCATION_ICON_BG, color: '#fff' }}
                        icon={<FontAwesomeIcon icon={faGraduationCap} size="lg" />}
                    >
                        <h3 className="vertical-timeline-element-title">Merkonomi</h3>
                        <h4 className="vertical-timeline-element-subtitle">Novida, Loimaa</h4>
                        <p>
                        Jos haluu kirjottaa jotain niin siitä vaaan tähän hei.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                        icon={<FontAwesomeIcon icon={faCheck} size="lg" />}
                    />
                </VerticalTimeline>
            </MDBRow>
        </div>
    )
    
}

export default Experience;