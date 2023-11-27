'use client'
import useTriggerContext from '@/context/triggerContext'
import React, { useEffect, useState } from 'react'

export function InteractiveScroll() {


    const { setStartCountingAnimation } = useTriggerContext()
    const [scaleElementFinded, setScaleElementFinded] = useState(false)

    function getAnimatedElementsNow() {
        let qtdElement = 0

        if (window !== undefined) {
            document.querySelectorAll(".animatedElementUpNow").forEach(element => {
                if (element.getClientRects()[0]) {
                    // element.getBoundingClientRect()?.top
                    element.style.transform = "translateY(0px)"
                    element.style.opacity = 1
                    qtdElement = qtdElement + 0.1
                    element.style.transitionDelay = qtdElement + 's'
                }
            })
        }
    }

    function getAnimatedElements(e) {

        let qtdElement = 0
        if (window !== undefined) {
            document.querySelectorAll(".animatedElmentBottom").forEach(element => {
                if (element.getClientRects()[0]?.y <= window.innerHeight / 0.8) {
                    element.getBoundingClientRect()?.top
                    element.style.transform = "translateY(0px)"
                    element.style.opacity = 1
                    qtdElement = qtdElement + 0.1
                    element.style.transitionDelay = qtdElement + 's'
                }
            })
        }



        if (window !== undefined) {
            document.querySelectorAll(".animatedElementUp").forEach(element => {
                if (element.getClientRects()[0]?.y <= window.innerHeight / 0.5) {
                    element.getBoundingClientRect().top
                    element.style.transform = "translateY(0px)"
                    element.style.opacity = 1
                    qtdElement = qtdElement + 0.1
                    element.style.transitionDelay = qtdElement + 's'
                }
            })
        }

        const elementRight = document.querySelectorAll('.animatedElementRight')
        if (elementRight.length > 0) {
            elementRight.forEach((e) => {
                if (e.getBoundingClientRect().y <= window.innerHeight / 1.5) {
                    e.style.opacity = '1'
                    e.style.transform = 'translateX(0px)'
                }
            })
        }

        const elementLeft = document.querySelectorAll('.animatedElementLeft')

        if (elementLeft.length > 0) {
            elementLeft.forEach((e) => {
                if (e.getBoundingClientRect().y <= window.innerHeight / 1.8) {
                    e.style.opacity = '1'
                    e.style.transform = 'translateX(0px)'
                }
            })
        }
        const opacityElements = document.querySelectorAll('.animatedOpacity')
        if (opacityElements?.length > 0) {

            opacityElements.forEach((opacityElement) => {
                if (opacityElement.getClientRects()[0]?.y <= window.innerHeight / 1.6) {
                    opacityElement.style.opacity = '1'
                }
            })
        }
        const scaleElements = document.querySelectorAll('.animatedScale')
        if (scaleElements?.length > 0) {

            scaleElements.forEach((scaleElement) => {
                if (scaleElement.style.transitionDelay != '0s' && scaleElement.getClientRects()[0].y <= window.innerHeight / 1.2) {
                    scaleElement.style.transitionDelay = '0.8s'
                    scaleElement.style.opacity = '1'
                    scaleElement.style.transform = 'scale(1)'
                }
            })
        }

        const animatedTitles = document.querySelectorAll('.animated_titles')
        let delay = 0.3

        animatedTitles.forEach((title) => {

            if (title.getClientRects()[0].y <= window.innerHeight / 1.2) {

                Array.from(title.children).forEach((children) => {
                    children.style.transitionDelay = delay + "s"
                    children.style.opacity = 1
                    delay += 0.2
                })
                setStartCountingAnimation(true)
                title.style.transform = 'scale(1)'
            }

        })

        const element0to100 = document.querySelectorAll('.element_0to100')

        if (element0to100.length > 0) {
            element0to100.forEach((e) => {
                if (e.getBoundingClientRect().y <= window.innerHeight / 1.8) {
                    e.style.opacity = '1'
                    e.style.width = '100%'
                }
            })
        }

        document.querySelectorAll(".interactiveScroll_title").forEach(element => {
            let elementPos = element.getBoundingClientRect().top

            if (elementPos < window.innerHeight / 1.2) {
                element.classList.add("revealed")
            }
        })

    }

    useEffect(() => {
        getAnimatedElementsNow()
        // window.addEventListener('scroll', (e) => getAnimatedElementsNow(e))
        window.addEventListener('scroll', (e) => getAnimatedElements(e))
        

            // window.removeEventListener('scroll', (e) => getAnimatedElementsNow(e))
         return (() => {   window.removeEventListener('scroll', (e) => getAnimatedElements(e))})
        

    }, [scaleElementFinded])


}