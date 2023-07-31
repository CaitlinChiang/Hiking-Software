import React, { useState, useEffect } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { BaseStyle, useTheme, BaseColor } from '@config';
import { Header, Text, SafeAreaView, TrainingExercise, Icon, Button } from '@components';
import { TrainingTimelineData } from '@data';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import Timeline from 'react-native-timeline-flatlist';
import Slider from '@react-native-community/slider';
import CheckBox from '@react-native-community/checkbox';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { SvgXml } from 'react-native-svg';
import { use } from 'i18next';

const relaxSolid = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zm53.5-96.7l0 0 0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0zm160 0l0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0 0 0z"/></svg>`
const relaxEmpty = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zm40-89.3l0 0 0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0zm160 0l0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0 0 0z"/></svg>`

const smileSolid = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#f9c05d}</style><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`;
const smileEmpty = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#f9c05d}</style><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`

const challengingSolid = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM96.8 314.1c-3.8-13.7 7.4-26.1 21.6-26.1H393.6c14.2 0 25.5 12.4 21.6 26.1C396.2 382 332.1 432 256 432s-140.2-50-159.2-117.9zM217.6 212.8l0 0 0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0zm160 0l0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0 0 0z"/></svg>`
const challengingEmpty = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm130.7 57.9c-4.2-13.6 7.1-25.9 21.3-25.9H364.5c14.2 0 25.5 12.4 21.3 25.9C369 368.4 318.2 408 258.2 408s-110.8-39.6-127.5-94.1zm86.9-85.1l0 0 0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0zm160 0l0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0 0 0z"/></svg>`

const sweatSolid = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M476.8 126.3c-4.1 1.1-8.4 1.7-12.8 1.7c-26.5 0-48-21-48-47c0-5 1.8-11.3 4.6-18.1c.3-.7 .6-1.4 .9-2.1c9-20.2 26.5-44.9 36-57.5c3.2-4.4 9.6-4.4 12.8 0C483.4 20.6 512 61 512 81c0 21.7-14.9 39.8-35.2 45.3zM256 0c51.4 0 99.3 15.2 139.4 41.2c-1.5 3.1-3 6.2-4.3 9.3c-3.4 8-7.1 19-7.1 30.5c0 44.3 36.6 79 80 79c9.6 0 18.8-1.7 27.4-4.8c13.3 30.9 20.6 65 20.6 100.8c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0zM383.8 317.8C345.3 329.4 301.9 336 256 336s-89.3-6.6-127.8-18.2c-12.3-3.7-24.3 7-19.2 18.7c24.5 56.9 81.1 96.7 147 96.7s122.5-39.8 147-96.7c5.1-11.8-6.9-22.4-19.2-18.7zm-166.2-89l0 0 0 0c2.1 2.8 5.7 3.9 8.9 2.8s5.5-4.1 5.5-7.6c0-17.9-6.7-35.6-16.6-48.8c-9.8-13-23.9-23.2-39.4-23.2s-29.6 10.2-39.4 23.2C126.7 188.4 120 206.1 120 224c0 3.4 2.2 6.5 5.5 7.6s6.9 0 8.9-2.8l0 0 0 0 0 0 .2-.2c.2-.2 .4-.5 .7-.9c.6-.8 1.6-2 2.8-3.4c2.5-2.8 6-6.6 10.2-10.3c8.8-7.8 18.8-14 27.7-14s18.9 6.2 27.7 14c4.2 3.7 7.7 7.5 10.2 10.3c1.2 1.4 2.2 2.6 2.8 3.4c.3 .4 .6 .7 .7 .9l.2 .2 0 0 0 0zm160 0l0 0 0 0 0 0c2.1 2.8 5.7 3.9 8.9 2.8s5.5-4.1 5.5-7.6c0-17.9-6.7-35.6-16.6-48.8c-9.8-13-23.9-23.2-39.4-23.2s-29.6 10.2-39.4 23.2C286.7 188.4 280 206.1 280 224c0 3.4 2.2 6.5 5.5 7.6s6.9 0 8.9-2.8l0 0 0 0 0 0 .2-.2c.2-.2 .4-.5 .7-.9c.6-.8 1.6-2 2.8-3.4c2.5-2.8 6-6.6 10.2-10.3c8.8-7.8 18.8-14 27.7-14s18.9 6.2 27.7 14c4.2 3.7 7.7 7.5 10.2 10.3c1.2 1.4 2.2 2.6 2.8 3.4c.3 .4 .6 .7 .7 .9l.2 .2 0 0z"/></svg>`
const sweatEmpty = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M476.8 126.3C497.1 120.8 512 102.7 512 81c0-20-28.6-60.4-41.6-77.7c-3.2-4.4-9.6-4.4-12.8 0c-9.5 12.6-27.1 37.2-36 57.5c-.3 .7-.6 1.4-.9 2.1C417.8 69.7 416 76 416 81c0 26 21.5 47 48 47c4.4 0 8.7-.6 12.8-1.7zM395.4 41.2C355.3 15.2 307.4 0 256 0C114.6 0 0 114.6 0 256S114.6 512 256 512s256-114.6 256-256c0-35.8-7.3-69.9-20.6-100.8c-8.6 3.1-17.8 4.8-27.4 4.8c-8.9 0-17.6-1.5-25.7-4.2C454.7 185.5 464 219.7 464 256c0 114.9-93.1 208-208 208S48 370.9 48 256S141.1 48 256 48c48.7 0 93.4 16.7 128.9 44.7c-.6-3.8-.9-7.7-.9-11.7c0-11.4 3.8-22.4 7.1-30.5c1.3-3.1 2.7-6.2 4.3-9.3zM375 336.5c10.4-16.1-6.8-32.5-25.5-28.1c-28.9 6.8-60.5 10.5-93.6 10.5s-64.7-3.7-93.6-10.5c-18.7-4.4-35.9 12-25.5 28.1c24.6 38.1 68.7 63.5 119.1 63.5s94.5-25.4 119.1-63.5zM217.6 228.8l0 0 0 0 0 0c2.1 2.8 5.7 3.9 8.9 2.8s5.5-4.1 5.5-7.6c0-17.9-6.7-35.6-16.6-48.8c-9.8-13-23.9-23.2-39.4-23.2s-29.6 10.2-39.4 23.2C126.7 188.4 120 206.1 120 224c0 3.4 2.2 6.5 5.5 7.6s6.9 0 8.9-2.8l0 0 0 0 0 0 .2-.2c.2-.2 .4-.5 .7-.9c.6-.8 1.6-2 2.8-3.4c2.5-2.8 6-6.6 10.2-10.3c8.8-7.8 18.8-14 27.7-14s18.9 6.2 27.7 14c4.2 3.7 7.7 7.5 10.2 10.3c1.2 1.4 2.2 2.6 2.8 3.4c.3 .4 .6 .7 .7 .9l.2 .2 0 0zm160 0l0 0 0 0c2.1 2.8 5.7 3.9 8.9 2.8s5.5-4.1 5.5-7.6c0-17.9-6.7-35.6-16.6-48.8c-9.8-13-23.9-23.2-39.4-23.2s-29.6 10.2-39.4 23.2C286.7 188.4 280 206.1 280 224c0 3.4 2.2 6.5 5.5 7.6s6.9 0 8.9-2.8l0 0 0 0 0 0 .2-.2c.2-.2 .4-.5 .7-.9c.6-.8 1.6-2 2.8-3.4c2.5-2.8 6-6.6 10.2-10.3c8.8-7.8 18.8-14 27.7-14s18.9 6.2 27.7 14c4.2 3.7 7.7 7.5 10.2 10.3c1.2 1.4 2.2 2.6 2.8 3.4c.3 .4 .6 .7 .7 .9l.2 .2 0 0 0 0z"/></svg>`

const tiredSolid = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.7 328.7c22-22 53.9-40.7 91.3-40.7s69.3 18.7 91.3 40.7c11.1 11.1 20.1 23.4 26.4 35.4c6.2 11.7 10.3 24.4 10.3 35.9c0 5.2-2.6 10.2-6.9 13.2s-9.8 3.7-14.7 1.8l-20.5-7.7c-26.9-10.1-55.5-15.3-84.3-15.3h-3.2c-28.8 0-57.3 5.2-84.3 15.3L149.6 415c-4.9 1.8-10.4 1.2-14.7-1.8s-6.9-7.9-6.9-13.2c0-11.6 4.2-24.2 10.3-35.9c6.3-12 15.3-24.3 26.4-35.4zm-31.2-182l89.9 47.9c10.7 5.7 10.7 21.1 0 26.8l-89.9 47.9c-7.9 4.2-17.5-1.5-17.5-10.5c0-2.8 1-5.5 2.8-7.6l36-43.2-36-43.2c-1.8-2.1-2.8-4.8-2.8-7.6c0-9 9.6-14.7 17.5-10.5zM396 157.1c0 2.8-1 5.5-2.8 7.6l-36 43.2 36 43.2c1.8 2.1 2.8 4.8 2.8 7.6c0 9-9.6 14.7-17.5 10.5l-89.9-47.9c-10.7-5.7-10.7-21.1 0-26.8l89.9-47.9c7.9-4.2 17.5 1.5 17.5 10.5z"/></svg>`
const tiredEmpty = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm176.5 64.3C196.1 302.1 223.8 288 256 288s59.9 14.1 79.5 32.3C354.5 338.1 368 362 368 384c0 5.4-2.7 10.4-7.2 13.4s-10.2 3.4-15.2 1.3l-17.2-7.5c-22.8-10-47.5-15.1-72.4-15.1s-49.6 5.2-72.4 15.1l-17.2 7.5c-4.9 2.2-10.7 1.7-15.2-1.3s-7.2-8-7.2-13.4c0-22 13.5-45.9 32.5-63.7zm-43-173.6l89.9 47.9c10.7 5.7 10.7 21.1 0 26.8l-89.9 47.9c-7.9 4.2-17.5-1.5-17.5-10.5c0-2.8 1-5.5 2.8-7.6l36-43.2-36-43.2c-1.8-2.1-2.8-4.8-2.8-7.6c0-9 9.6-14.7 17.5-10.5zM396 157.1c0 2.8-1 5.5-2.8 7.6l-36 43.2 36 43.2c1.8 2.1 2.8 4.8 2.8 7.6c0 9-9.6 14.7-17.5 10.5l-89.9-47.9c-10.7-5.7-10.7-21.1 0-26.8l89.9-47.9c7.9-4.2 17.5 1.5 17.5 10.5z"/></svg>`

// Imports for firebase (you can get this from firebase.js as well to make it cleaner)
const firebaseConfig = {
  // Your Firebase configuration
};

// Important initialization. must be done in index.js
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const Booking = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [trainingTimeline] = useState(TrainingTimelineData);
  const [rating, setRating] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [chosenEmoticon, setChosenEmoticon] = useState('easy');
  const [randomElements, setRandomElements] = useState([]);

  const test_data = trainingTimeline?.map((item, index) => {
    return {
      description: (
        <TrainingExercise
          title={item.title}
          duration={item.duration}
          style={{ paddingVertical: 10, marginHorizontal: 20, marginTop: -30 }}
          onPress={() => {
            navigation.navigate('TrainingExercise');
          }}
        />
      )
    }
  })

  const getRandomElements = (array, count) => {
    // Create a copy of the original array
    const shuffled = array.slice();
  
    // Fisher-Yates shuffle algorithm
    let currentIndex = shuffled.length;
    let temporaryValue, randomIndex;
  
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      temporaryValue = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex];
      shuffled[randomIndex] = temporaryValue;
    }
  
    // Return the first 'count' elements
    return shuffled.slice(0, count);
  }

  useEffect(() => {
    setRandomElements(getRandomElements(test_data, 4));
  }, []);

  // Complete button that saves training progress into Firebase
  const onCompleteTraining = async (exercise, date, rating) => {
    let difficulty = 2

    if (rating === 'easy') {
      difficulty = 2
    } else if (rating === 'moderate') {
      difficulty = 4
    } else if (rating === 'challenging') {
      difficulty = 6
    } else if (rating === 'intense') {
      difficulty = 8
    } else if (rating === 'extreme') {
      difficulty = 10
    }

    try {
      const userId = 'A8N2OS1isndpX5XKeiZb';

      // Save the completed exercise data
      const completedExerciseRef = db.collection('users').doc(userId);
      const completedExerciseData = {
        exercise,
        date,
        difficulty,
      };
      await completedExerciseRef.update({
        completedExercises: firebase.firestore.FieldValue.arrayUnion(completedExerciseData),
      });
      console.log('Completed exercise data saved successfully!');

      // Show the success message
      Alert.alert('Success', 'Exercise completed and saved successfully!');

      // Set completion status and disable the button
      setIsCompleted(true);
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title=""
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={'grey'}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <View style={{ marginTop: 20 }}>
          <Text title1 semibold style={{ paddingHorizontal: 20 }}>
            {'Training #1'}
          </Text>
          <Text title3 style={{ paddingHorizontal: 20, paddingTop: 15 }}>
            {'Date: July 15, 2023'}
          </Text>
        </View>

        <View style={{ flex: 1, marginLeft: -20, marginTop: 35 }}>
          <Timeline
            data={randomElements}
            circleSize={20}
            circleColor="#554c3d"
            lineColor="#554c3d"
            innerCircle={'dot'}
          />
        </View>

        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ padding: 10 }} caption>How did that activity feel?</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity style={{ alignItems: 'center', marginRight: 10, width: 80 }} onPress={() => setChosenEmoticon('easy')}>
                <SvgXml
                  xml={chosenEmoticon === 'easy' ? relaxSolid : relaxEmpty}
                  width={24}
                  height={24}
                  fill={'#EFE514'}
                />
                <Text style={{ marginTop: 5, fontSize: 12 }}>Easy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center', marginRight: 10, width: 80 }} onPress={() => setChosenEmoticon('moderate')}>
                <SvgXml
                  xml={chosenEmoticon === 'moderate' ? smileSolid : smileEmpty}
                  width={24}
                  height={24}
                  fill={'#F4C653'}
                />
                <Text style={{ marginTop: 5, fontSize: 12 }}>Comfortable</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center', marginRight: 10, width: 80 }} onPress={() => setChosenEmoticon('challenging')}>
                <SvgXml
                  xml={chosenEmoticon === 'challenging' ? challengingSolid : challengingEmpty}
                  width={24}
                  height={24}
                  fill={'#FFA238'}
                />
                <Text style={{ marginTop: 5, fontSize: 12 }}>Challenging</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center', marginRight: 10, width: 80 }} onPress={() => setChosenEmoticon('intense')}>
                <SvgXml
                  xml={chosenEmoticon === 'intense' ? sweatSolid : sweatEmpty}
                  width={24}
                  height={24}
                  fill={'#FF6538'}
                />
                <Text style={{ marginTop: 5, fontSize: 12 }}>Intense</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center', marginRight: 10, width: 80 }} onPress={() => setChosenEmoticon('extreme')}>
                <SvgXml
                  xml={chosenEmoticon === 'extreme' ?  tiredSolid: tiredEmpty}
                  width={24}
                  height={24}
                  fill={'#FF1313'}
                />
                <Text style={{ marginTop: 5, fontSize: 12 }}>Extreme</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 10 }} />

          <Button
            onPress={() => onCompleteTraining('Training #1', 'July 15, 2023', chosenEmoticon)}
            disabled={isCompleted}
            style={isCompleted ? styles.completedButton : null}
            textStyle={isCompleted ? styles.completedButtonText : null}
          >
            {isCompleted ? 'Completed' : 'Complete'}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Booking;
