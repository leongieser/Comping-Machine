import { useSession } from 'next-auth/react'
import Layout from 'bring/components/layout/MainLayout';
import Navbar from 'bring/components/layout/NavBar';
import { useEffect } from 'react';
import InstrumentLayout from 'bring/components/layout/InstrumentLayout';
import SampleSequencer from 'bring/components/drumSequencer/SampleSequencer';
import * as Tone from 'tone';
import { useMasterControlStore, type TmasterControlStore } from 'bring/components/drumSequencer/masterControlStore';
import PadChordMachine from 'bring/components/padMachine';

//TODO appropriate name for container
export default function playgroundPage() {
  const {toggleaudioContextLoaded} = useMasterControlStore() as TmasterControlStore
  const session = useSession()
  const {data} = session
  console.log("playground page: ", data);

  // useEffect(() => {
  //   const enableAudioContext = async () => {
  //     await Tone.start()
  //     toggleaudioContextLoaded()
  //   };

  //   enableAudioContext()

  //   return () => {}
  // }, [])




  // if(!data) router.push("/")

  // useEffect fetch all the settings for cmapp and pass them to zustand store

  return (
    <Layout>
      <Navbar/>
      {/* <InstrumentLayout/> */}
      <PadChordMachine/>
      {/* <SampleSequencer/> */}
    </Layout>
  )
}

