import { useSession } from 'next-auth/react'
import Layout from 'bring/components/layout/MainLayout';

import { useEffect } from 'react';
import InstrumentLayout from 'bring/components/layout/InstrumentLayout';
import SampleSequencer from 'bring/components/drumSequencer/SampleSequencer';
import * as Tone from 'tone';
import { useMasterControlStore, type TmasterControlStore } from 'bring/components/drumSequencer/masterControlStore';

import PadChordMachine from 'bring/components/padPiano/padMachine';
import Navbar from 'bring/components/layout/Navbar';

//TODO appropriate name for container
export default function playgroundPage() {

  const session = useSession()
  const {data} = session
  console.log("playground page: ", data);


const samples = [
  { "url": "/audio/kit-808/kick.mp3", "name": "Kick" },
  { "url": "/audio/kit-808/rimshot.mp3", "name": "Rim Shot" }
]


  // if(!data) router.push("/")

  // useEffect fetch all the settings for cmapp and pass them to zustand store

  return (
    <Layout>
      <Navbar/>
      <InstrumentLayout />

      {/* <PadChordMachine/>

      <SampleSequencer/> */}

    </Layout>
  )
}

