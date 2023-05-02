export type User = {
  id:         string,
  username?:  string
  email:      string,
  sessions:   Session[]
}

export type Session = {
  id:           String,
  name:         String,
  creationDate: Date,
  pad_sound?:   String,
  pad_track:    String[],
  drumkit:      String
  // drum_tracks drumtrack?
}

export type TChord = {
  chordType: string,
  rootNote: string,
  updateType: (type: string) => void,
  updateRoot: (note: string) => void
}