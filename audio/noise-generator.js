/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A noise generator with a gain AudioParam.
 *
 * @class NoiseGenerator
 * @extends AudioWorkletProcessor
 */
class NoiseGenerator extends AudioWorkletProcessor {

  constructor(){
      super();
  }

  static get parameterDescriptors() {
    return [
      {name: 'velocity', defaultValue: 0, minValue: 0, maxValue: 1},
    ];
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const velocity = parameters.velocity;
    const isVelocityConstant = velocity.length === 1;

    for (let channel = 0; channel < output.length; ++channel) {
      const outputChannel = output[channel];
      for (let i = 0; i < outputChannel.length; ++i) {
        // multiplying the sound by a random value between 0-1 to the power of 100 (which gives very low values unless the random value is close to 1)
        // causes the random noise to be quieter, but with the occasional snap.
        // to generate more snaps/time we need to increase the odds of the random number to be close to 1.
        // to do this we set the speed range from 1 to 10, divide the random number by the speed, and add 1-1/speed. 
        // To for example set the range from .9 to 1. example: (0.5 / 10) + 1-1/10 = 0.05 + 0.9 = 0.95
        let chanceToAmplify = 0;
        const v = (isVelocityConstant ? velocity[0] : velocity[i])
        if(v > 0.01){ // too small v generates artifacts
          const s = v * 100
          chanceToAmplify = (Math.random() / s) + (1-1/s);
          const output = 2 * (Math.random() - 0.5)
          * Math.pow(chanceToAmplify, 100) // power of 1000 creates numbers up to infinity
          * ((v / 2) + 0.5);
          // This loop can branch out based on AudioParam array length
          outputChannel[i] = output // scale amplitude/volume with speed
        }else{
          outputChannel[i] = 0
        }
      }
    }

    return true;
  }
}

registerProcessor('noise-generator', NoiseGenerator);