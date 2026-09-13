// Spatial Web Audio Synthesizer (Altitude 101 style ambient & micro-interactions)
// Default state is MUTED. Only plays when the user explicitly clicks the Audio HUD toggle.

class SpatialAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;

  private initContext() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.15, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public toggleMute(): boolean {
    this.initContext();
    if (!this.ctx || !this.masterGain) return true;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbient();
      this.masterGain.gain.setTargetAtTime(0.12, this.ctx.currentTime, 0.5);
      this.playTone(440, 0.1, 'sine');
    } else {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      this.stopAmbient();
    }

    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private startAmbient() {
    if (!this.ctx || !this.masterGain || this.ambientOsc1) return;

    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      // Low frequency spatial drone
      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 note

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, this.ctx.currentTime);

      this.ambientOsc1.connect(filter);
      this.ambientOsc2.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.masterGain);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
    } catch {
      // Ignore audio start failures
    }
  }

  private stopAmbient() {
    try {
      if (this.ambientOsc1) {
        this.ambientOsc1.stop();
        this.ambientOsc1.disconnect();
        this.ambientOsc1 = null;
      }
      if (this.ambientOsc2) {
        this.ambientOsc2.stop();
        this.ambientOsc2.disconnect();
        this.ambientOsc2 = null;
      }
    } catch {
      // Ignore audio stop errors
    }
  }

  public playHover() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.playTone(880, 0.05, 'sine', 0.02);
  }

  public playClick() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.playTone(587.33, 0.08, 'triangle', 0.06); // D5
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', vol = 0.05) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore tone play errors
    }
  }
}

export const spatialAudio = new SpatialAudioEngine();
