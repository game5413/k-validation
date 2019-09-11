var KempebValidator = {
    schema(skema) {
        try {
            if (!skema) throw {status: 400, message: 'should passing paramater skema'};
            if (Array.isArray(skema) || !(skema instanceof Object)) throw {status: 400, message: 'should object'};
            if (!(Object.keys(skema)).length) throw {status: 400, message : 'object should contain atleast one keys'};
            /**
             * Validation Variables
             * @TODO make variable can be accessed by GETTER SETTER FUNCTION
             * @TODO link for helping development https://codeburst.io/javascript-the-keyword-this-for-beginners-fb5238d99f85
             */

            var _SCHEMA, _VALUE, _RULES_PARAMETER, _THIS, _SAMEAS_VALUE = {}, _RESULT = {}

            _THIS = {
                'required': required,
                'string': string,
                'number': number,
                'min': min,
                'max': max,
                '_VALUE': _VALUE,
                '_RULES_PARAMETER': _RULES_PARAMETER,
                '_SAMEAS_VALUE': _SAMEAS_VALUE
            }

            /**
             * GETTER & SETTER
             * @TODO learn about prototype bind,apply,call
             * @TODO make some research about prototype function
             * @TODO make function is rules exist for check valid rules

                function SET_VALUE (type = '', value = '') {
                    try {
                        if (!type) throw {status: 400, message: 'type empty'};
                        if (!value) throw {status: 400, message: 'value empty'};
                        if (!(typeof(type) === "string")) throw {status: 400, message: 'should string'};
                        _THIS[type] = value
                        return {status: 200, message: 'Succesfull', data: _THIS[type]}
                    } catch (errors) {
                        const {status, message} = errors
                        return {status: status || 500, message: message || 'error'}
                    }
                }

                function GET_VALUE (type = '') {
                    try {
                        if (!type) throw {status: 400, message: 'type empty'};
                        if (!value) throw {status: 400, message: 'value empty'};
                        if (!(typeof(type) === "string")) throw {status: 400, message: 'should string'};
                        return {status: 200, message: 'Succesfull', data: _THIS[type]}
                    } catch (errors) {
                        const {status, message} = errors
                        return {status: status || 500, message: message || 'error'}
                    }
                }
             */

            /**
             * Validation Rules Function
             * @TODO make validation same as for comparison
             * @TODO change required fungsi to check object or array
             */

            function string() {
                if (!_VALUE) throw 'empty value'
                if (typeof(_VALUE) !== 'string') {
                    return 'data harus berformat string'
                }
            }

            function number() {
                if (!_VALUE) throw 'empty value'
                if (!parseFloat(_VALUE)) throw 'not numeric string'
                if (typeof(_VALUE) !== 'number') {
                    return 'data harus berformat numeric'
                }
            }

            function sameas() {}

            function required() {
                if (!(Array.isArray(_VALUE)) && (_VALUE instanceof Object)) {
                    if (!(Object.keys(_VALUE)).length) {
                        return 'data object harus memiliki satu key'
                    }
                }
                if (Array.isArray(_VALUE) && (_VALUE instanceof Object)) {
                    if (!_VALUE.length) {
                        return 'data array harus memiliki satu key'
                    }
                }
                if (!_VALUE) {
                    return 'data harus di isi'
                }
            }

            function min() {
                if (!_VALUE) throw 'data empty'
                var length = _VALUE.length
                if (!(Array.isArray(_VALUE)) && (_VALUE instanceof Object)) {
                    if ((Object.keys(_VALUE)).length < _RULES_PARAMETER) {
                        return 'data minimal object adalah ' + _RULES_PARAMETER
                    }
                }
                if (Array.isArray(_VALUE) && (_VALUE instanceof Object)) {
                    if (_VALUE.length < _RULES_PARAMETER) {
                        return 'data minimal array adalah ' + _RULES_PARAMETER
                    }
                }
                console.log(length, _RULES_PARAMETER)
                if (length < _RULES_PARAMETER) {
                    return 'data minimal karakter adalah ' + _RULES_PARAMETER
                }
            }

            function max() {
                if (!_VALUE) throw 'data empty'
                var length = _VALUE.length
                if (!(Array.isArray(_VALUE)) && (_VALUE instanceof Object)) {
                    if ((Object.keys(_VALUE)).length <= _RULES_PARAMETER) {
                        return 'data maksimal object adalah ' + _RULES_PARAMETER
                    }
                }
                if (Array.isArray(_VALUE) && (_VALUE instanceof Object)) {
                    if (_VALUE.length <= _RULES_PARAMETER) {
                        return 'data maksimal array adalah ' + _RULES_PARAMETER
                    }
                }
                if (length <= _RULES_PARAMETER) {
                    return 'data maksimal karakter adalah ' + _RULES_PARAMETER
                }
            }

            function phone() {}

            function email() {
                var regex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g)
            }

            function regex() {}

            /**
             * Validate Function for Return
             * @TODO make recursive function to call validation function rules
             */

            function validate(data_object, _callback) {
                try {
                    if (!data_object) throw {status: 400, message: 'empty'};
                    if (Array.isArray(data_object) || !(data_object instanceof Object)) throw {status: 400, message: 'should object'};
                    var key_iterator, _RULES, _CLEAN_RULES, _SPLITE_RULES, _ASSIGN_FUNCTION;
                    for (key_iterator in data_object) {
                        _RULES = _SCHEMA[key_iterator]
                        if (_RULES) {
                            _CLEAN_RULES = _RULES.replace(/(\|{2}|[^a-zA-Z0-9|-])/gm, '')
                            if (_CLEAN_RULES[(_CLEAN_RULES.length - 1)] === '|') _CLEAN_RULES = _CLEAN_RULES.slice(0, (_CLEAN_RULES.length - 1))
                            _SPLITE_RULES = _CLEAN_RULES.split('|')
                            _VALUE = data_object[key_iterator]
                            _ASSIGN_FUNCTION = _call_validation(_SPLITE_RULES)
                            if (_ASSIGN_FUNCTION) {
                                _RESULT[key_iterator] = _ASSIGN_FUNCTION
                                continue
                            }
                        }
                    }
                    var res = Object.assign({}, _RESULT)
                    _RESULT = {}
                    if (_callback) return _callback({status: 200, message: 'Success', data: (Object.keys(res)).length ? res : null})
                    return {status: 200, message: 'Success', data: (Object.keys(res)).length ? res : null}
                } catch (errors) {
                    const {status, message} = errors
                    return {status: status || 500, message: message || 'error'}
                }
            }

            /**
             * [pemanggilan fungsi validasi secara rekursif]
             *
             * @param   {[Array]}  _ARRAY_OF_RULES  [list array rules yang dilempar secara rekursif]
             * @TODO bind _THIS to validation function list
             * @return  {[String]}                   [memberikan return berbentuk string]
             */
            function _call_validation(_ARRAY_OF_RULES) {
                if (!(Array.isArray(_ARRAY_OF_RULES)) && !(_ARRAY_OF_RULES instanceof Object)) throw 'should array'
                if (_ARRAY_OF_RULES.length) {
                    var _FUNCTION
                    if (_ARRAY_OF_RULES[0].search('-') > 0) {
                        _FUNCTION = _THIS[_ARRAY_OF_RULES[0].slice(0, _ARRAY_OF_RULES[0].search('-'))]
                        _RULES_PARAMETER = _ARRAY_OF_RULES[0].slice((_ARRAY_OF_RULES[0].search('-') + 1), _ARRAY_OF_RULES[0].length)
                    } else {
                        _FUNCTION = _THIS[_ARRAY_OF_RULES[0]]
                    }
                    if (!_FUNCTION) throw 'undefined function'
                    console.log(_ARRAY_OF_RULES)
                    _FUNCTION = _FUNCTION()
                    console.log(_FUNCTION, _VALUE, _SCHEMA)
                    if (!_FUNCTION) {
                        _ARRAY_OF_RULES.splice(0, 1)
                        return _call_validation(_ARRAY_OF_RULES)
                    }
                    return _FUNCTION
                }
            }

            _SCHEMA = skema

            return {validate}

        } catch (errors) {
            const { status, message } = errors
            return {status: status || 500, message: message || 'error'}
        }
    }
}