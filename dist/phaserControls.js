/**
 * @author Conor Irwin <conorirwin.co.uk> 
 * @classdesc 
 * GitHub: https://github.com/retroVX/phaser3-controls <br>
 * A simple class to assist with creating control schemes with keyboard inputs for Phaser (3) <br>
 * @example 
 * this.controls = new phaserControls(this);
 * @version: 1.0.0
 * @class phaserControls
 * @param {Phaser.Scene} scene - The Scene the phaserControls will be created in (this)
 */

// global schemes array so when switching scenes you do not lose your setup schemes
let schemes = [];

export default class phaserControls {

    constructor(scene) {

        /**
         * Get 'this' from scene
         * @name phaserControls.scene
         * @type {Object}
         * @since 1.0.0
         */

        this.scene = scene;


        /**
         * Holds all the control schemes in an array
         * @name phaserControls.schemes
         * @type {Array}
         * @since 1.0.0
         * @example
         * this.controls.schemes
         * // [{name: "azerty", controls: {…}, active: false}{}{}]
         */  

        this.schemes = schemes;


        /**
         * Stores the keyboard keys that have been created from a control scheme
         * @name phaserControls.keys
         * @type {Object}
         * @since 1.0.0
         * @example
         * this.controls.keys
         * // {up: keyInfo, down: keyInfo, left: keyInfo, down: keyInfo}
         * this.controls.keys.up.isDown 
         * this.controls.keys.down.isDown
         */ 

        this.keys = null;

        // set scheme active
        if(schemes.length > 0) this.setActive(schemes[0]);



        /**
         * Config example to pass into phaserControls
         * @method Config
         * @type {Object}
         * @since 1.0.0
         * @namespace
         * @property {string} name - The name of the control scheme
         * @property {object} controls - Controls names and keys to use
         * @property {string} active - Whether to set this control scheme to active
         * @example
         * const config = {
         *     name: 'azertyKeys',
         * 
         *     controls: {
         *         up: 'Z',
         *         down: 'S',
         *         left: 'Q',
         *         right: 'D',
         *         shift: 'SHIFT',
         *         space: 'SPACE',
         *     },
         * 
         *     active: false,
         * }
         */   

        const config = {

            name: '',
             
            controls: {
                up: '',
                down: '',
                left: '',
                right: '',
                shift: '',
                space: '',
            },
             
            active: false,
        }


    }


    /**
    * Create default cursor keys.  
    * The difference between this.input.keyboard.createCursorKeys(); and phaserControls.createCursorKeys();
    * is that the phaserControls will be added to the control scheme array with other created control schemes.
    * @example
    * this.controls.createCursorKeys();
    * @method phaserControls.createCursorKeys
    * @type {function}
    * @param {boolean} [active=false] - If the cursor keys should be used, overiding current scheme
    * @param {boolean} [add=true] - add the default cursor keys to the schemes list
    * @since 1.0.0
    */

    createCursorKeys(active, add) {
        // make sure 'add' & 'active' are not undefined
        if (this.cursorKeys !== undefined) return console.log('Cursor Keys already created!');
        if (active === undefined || active === null) active = false;
        if (add === undefined || add === null) add = true;
        // scheme
        this.cursorKeys = {

            name: 'cursorKeysDefault',

            controls: {
                up: 'UP',
                down: 'DOWN',
                left: 'LEFT',
                right: 'RIGHT',
                shift: 'SHIFT',
                space: 'SPACE'
            },

            active: active,
        }
        // if true add to list of schemes
        if (add) {
            this.add(this.cursorKeys);
            // select cursor key scheme if set to 'active'
            if (active) {
                this.setActive('cursorKeysDefault');
            }
        }

        return this.cursorKeys;
    }


    /**
    * Create default wasd keys. The same approach as phaserControls.createCursorKeys but using WASD instead.
    * @example
    * this.controls.createWasdKeys();
    * @method phaserControls.createWasdKeys
    * @type {function}
    * @param {boolean} [active=false] - If the wasd keys should be used, overiding current scheme
    * @param {boolean} [add=true] - add the default wasd keys to the schemes list
    * @since 1.0.0
    */
  
    createWasdKeys(active, add) {
        // make sure 'add' & 'active' are not undefined
        if (this.wasdKeys !== undefined) return console.log('WASD Keys already created!');
        if (active === undefined || active === null) active = false;
        if (add === undefined || add === null) add = true;
        // scheme
        this.wasdKeys = {

            name: 'wasdKeysDefault',

            controls: {
                up: 'W',
                down: 'S',
                left: 'A',
                right: 'D',
                shift: 'SHIFT',
                space: 'SPACE'
            },

            active: active,
        }

        // if true add to list of schemes
        if (add) {
            this.add(this.wasdKeys);
            // select wasd key scheme if set to 'active'
            if (active) {
                this.setActive('wasdKeysDefault');
            }
        }

        return this.wasdKeys;
    }


    /**
    * Add new control scheme and switch to the new scheme if it's set to 'active'
    * @method phaserControls.add
    * @type {function}
    * @param {object} config - A new scheme config to be added to the schemes array
    * @since 1.0.0
    * @example
    * this.controls.add(config);
    */

    add(config) {
        // add new control scheme
        this.schemes.push(config);
        schemes = this.schemes;

        // if new control scheme is set to 'active' then switch
        if (config.active) {
            this.setActive(config);
        }
    }


    /**
    * Adds an array of multiple control scheme objects into the schemes array <br>
    * Useful if saving the controls with localStorage
    * @method phaserControls.addMultiple
    * @type {function}
    * @param {Array} array - An array of control scheme objects
    * @since 1.0.0
    * @example
    * this.controls.addMultiple({config}, {config}, {config});
    */

    addMultiple(array) {

        if(array.length > 0) {
            // get schemes from passed in array and add to the phaserControls.schemes array
            array.forEach(function(config, index){
                this.schemes.push(config);
                schemes = this.schemes;

                if(config.active) {
                    this.setActive(config);
                }
            })
        } 
    }


    /**
    * Returns the control scheme object that matches the control scheme name
    * @method phaserControls.get
    * @type {function}
    * @param {string} name - The name of the scheme to get and return as object
    * @param {boolean} [active=false] - if the scheme should be used, overiding current scheme
    * @return {Object} The control scheme object
    * @since 1.0.0
    * @example
    * this.controls.get('azerty');
    * // {name: "azerty", controls: {…}, active: false}
    */

    get(name, active) {
        // if name is undefined then return the currently used scheme
        if (name === undefined || name === null) return this.getActive();
        if (active === undefined || active === null) active = false;

        // find the scheme
        let getScheme = this.schemes.find(function (s) {
            return s.name === name;
        });

        // if set to active
        if (active) {
            this.setActive(getScheme);
        }

  
        return getScheme;
        
    }


    /**
    * Returns the active control scheme object or name string
    * @method phaserControls.getActive
    * @type {function}
    * @param {boolean} [name=false] - If true returns only the schemes name
    * @return {(Object|string)} The control scheme object or string
    * @since 1.0.0
    * @example
    * this.controls.getActive();
    * // {name: "newKeyScheme", controls: {…}, active: true}
    */

    getActive(name) {
        if (name === undefined || name === null) name = false;
        // find the scheme
        let findScheme = this.schemes.find(function (s) {
            return s.active === true;
        });
        // if name is set to true then only return the current schemes name
        if (name) {
            return findScheme.name;
        } else {
            return findScheme;
        }

    }


    /**
    * Select control scheme while turning off the currently used scheme
    * @method phaserControls.setActive
    * @type {function}
    * @param {(string|Object)} scheme - the 'name' or object of a scheme to be selected
    * @since 1.0.0
    * @example
    * // set 'azerty' control scheme active
    * this.controls.setActive('azerty');
    */

    setActive(scheme) {
        const scene = this.scene;
        let getNewScheme;
        // find scheme and set to 'active' while setting others to false
        this.schemes.forEach(function (s) {
            if (s.active) {
                s.active = false;
            }
            // find by string or by object 
            if (scheme === s.name || scheme === s) {
                s.active = true;
                getNewScheme = s;
            }
        });

        // set new keys
        this.keys = scene.input.keyboard.addKeys(getNewScheme.controls);
        this.keys.name = getNewScheme.name;
    }


    /**
    * Edit control scheme. This is used if you need to edit a control scheme on the front end
    * @method phaserControls.edit
    * @type {function}
    * @param {(string|object)} scheme - The scheme name to find and edit
    * @param {Object} config - config to edit
    * @since 1.0.0
    * @example
    * this.controls.edit('azerty', newConfig);
    */

    edit(scheme, config) {
        // find scheme then overwrite the scheme with the config
        this.schemes.forEach(function (s, index) {
            if (s.name === scheme || s === scheme) {
                this.schemes[index] = config;
            }
        }, this);

    }


    /**
    * Delete scheme from the schemes array and removes key and key captures
    * @method phaserControls.delete
    * @type {function}
    * @param {(string|object)} scheme - The scheme name to find and delete
    * @param {boolean} destroy - Removes keys and captures used by scheme (phaser version >= 3.16)
    * @since 1.0.0
    * @example
    * this.controls.delete('azerty');
    */

    delete(scheme, destroy) {
        const scene = this.scene;
        let schemesArray = this.schemes;
        let nextScheme = false;
        let currentControls = Object.keys(this.keys);

        // find matching scheme then splice from the array
        schemesArray.forEach(function (s, index) {
            if (s.name === scheme || s === scheme) {
                // if the deleted scheme was the active scheme
                if (s.active) {
                    nextScheme = true;
                }

                // delete keys and captures if set to 'destroy'
                if (destroy) {
                    currentControls.forEach(function (key) {
                        scene.input.keyboard.removeCapture(this.keys[key].keyCode);
                        scene.input.keyboard.removeKey(this.keys[key]);
                    }, this);
                }

                // remove scheme from this.schemes array
                schemesArray.splice(index, 1);
            }
        }, this);

        if (nextScheme) {
            // select the first scheme in the array
            this.setActive(schemesArray[0]);
        }
    }


    /**
    * Debug text displaying current control scheme thats being used.
    * Click on the text to move onto the next control scheme and select it.
    * @method phaserControls.debugText
    * @type {function}
    * @param {number} x - x coordinate for text display on canvas
    * @param {number} y - y coordinate for text display on canvas
    * @param {number} fontsize - Fontsize to display the text at.
    * @param {string} color - font color.
    * @since 1.0.0
    * @example
    * this.controls.debugText(100, 100, 20, '#000000');
    */

    debugText(x, y, fontsize, color) {

        const scene = this.scene;
        let i = 0;
        // show the control scheme that is currently being used
        let scheme = this.getActive();

        // create the text to display the control schemes
        this.controlsText = scene.add.text(x, y, 'Click text to change the control scheme. \n \n' + JSON.stringify(scheme, undefined, 2), {
            fontFamily: 'Verdana',
            fontSize: fontsize,
            color: color
        }).setOrigin(0.5, 0.5);
        // add setInteractive on text so we can click on the text
        this.controlsText.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.controlsText.width, this.controlsText.height), Phaser.Geom.Rectangle.Contains);
        // when text is clicked on then display and set to active the next control scheme
        this.controlsText.on('pointerdown', function (pointer) {
            if (i < this.schemes.length - 1) {
                i++;
            } else {
                i = 0;
            }
            scheme = this.schemes[i];
            // update text and control scheme
            this.setActive(this.schemes[i].name);
            this.controlsText.setText('Click text to change the control scheme. \n \n' + JSON.stringify(scheme, undefined, 2));
        }, this);
    }
}