type User = {
  id:         string,
  username?:  string
  email:      string,
  sessions:   Session[]
}

type Session = {
  id:           String,
  name:         String,
  creationDate: Date,
  pad_sound?:   String,
  pad_track:    String[],
  drumkit:      String
  // drum_tracks drumtrack?
}

export type Tchord = {
  chordType: string,
  rootNote: string,
  updateType: () => void,
  updateRoot: () => void
}