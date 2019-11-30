/*
    {
        value: value,
        field: field,
        rules: {
            required: {
                message: message
            },
            ...
        }
    }
*/
(function() {
    if (window.KValidation) delete window.KValidation
    var KValidation = {
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
    
                var _SCHEMA, _VALUE, _RULES_PARAMETER, _THIS, _SAMEAS_VALUE = {}, _RESULT = {}, _CUSTOM_MESSAGE = ''
    
                _THIS = {
                    'required': required,
                    'string': string,
                    'number': number,
                    'min': min,
                    'max': max,
                    'regex': regex,
                    'phone': phone,
                    'email': email,
                    'sameas': sameas,
                    '_VALUE': _VALUE,
                    '_RULES_PARAMETER': _RULES_PARAMETER,
                    '_SAMEAS_VALUE': _SAMEAS_VALUE
                }
    
                /**
                 * GETTER & SETTER
                 * @TODO learn about prototype bind,apply,call
                 * @TODO make some research about prototype function
                 * @TODO make function is rules exist for check valid rules (uneeded)
    
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
                 * @TODO change required fungsi to check object or array (partial)
                 */
    
                function string() {
                    if (!_VALUE) throw {status: 400, message:'data empty'}
                    if (typeof(_VALUE) !== 'string') {
                        return _CUSTOM_MESSAGE || 'data harus berformat string'
                    }
                }
    
                function number() {
                    if (!_VALUE) throw {status: 400, message:'data empty'}
                    if (!parseFloat(_VALUE)) throw 'not numeric string'
                    if (typeof(_VALUE) !== 'number') {
                        return _CUSTOM_MESSAGE || 'data harus berformat numeric'
                    }
                }
    
                function sameas() {
                    if (_VALUE !== _SAMEAS_VALUE[_RULES_PARAMETER] || _VALUE != _SAMEAS_VALUE[_RULES_PARAMETER]) {
                        return _CUSTOM_MESSAGE || 'value tidak sama dengan ' + _RULES_PARAMETER
                    }
                }
    
                function required() {
                    if (!Array.isArray(_VALUE) && _VALUE instanceof Object && !_VALUE instanceof Date) {
                        if (!Object.keys(_VALUE).length) {
                            return _CUSTOM_MESSAGE || 'data object harus memiliki satu key'
                        }
                    }
                    if (Array.isArray(_VALUE) && _VALUE instanceof Object && !_VALUE instanceof Date) {
                        if (!_VALUE.length) {
                            return _CUSTOM_MESSAGE || 'data array harus memiliki satu key'
                        }
                    }
                    if (!_VALUE) {
                        return _CUSTOM_MESSAGE || 'data harus di isi'
                    }
                }
    
                function min() {
                    if (!_VALUE) throw {status: 400, message:'data empty'}
                    var length
                    if (typeof _VALUE === 'string') {
                        length = _VALUE.length
                    } else if (!Number.isNaN(Number(_VALUE))) {
                        length = _VALUE
                    } else {
                        length = _VALUE
                    }
                    if (!Array.isArray(_VALUE) && _VALUE instanceof Object && !_VALUE instanceof Date) {
                        if (Object.keys(_VALUE).length < _RULES_PARAMETER) {
                            return _CUSTOM_MESSAGE || 'data minimal object adalah ' + _RULES_PARAMETER
                        }
                    }
                    if (Array.isArray(_VALUE) && _VALUE instanceof Object && !_VALUE instanceof Date) {
                        if (_VALUE.length < _RULES_PARAMETER) {
                            return _CUSTOM_MESSAGE || 'data minimal array adalah ' + _RULES_PARAMETER
                        }
                    }
                    // console.log(length, _RULES_PARAMETER)
                    if (length < _RULES_PARAMETER) {
                        return _CUSTOM_MESSAGE || 'data minimal karakter adalah ' + _RULES_PARAMETER
                    }
                }
    
                function max() {
                    if (!_VALUE) throw {status: 400, message:'data empty'}
                    var length
                    if (typeof _VALUE === 'string') {
                        length = _VALUE.length
                    } else if (!Number.isNaN(Number(_VALUE))) {
                        length = _VALUE
                    } else {
                        length = _VALUE
                    }
                    if (!Array.isArray(_VALUE) && _VALUE instanceof Object && !_VALUE instanceof Date) {
                        if (Object.keys(_VALUE).length > _RULES_PARAMETER) {
                            return _CUSTOM_MESSAGE || 'data maksimal object adalah ' + _RULES_PARAMETER
                        }
                    }
                    if (Array.isArray(_VALUE) && _VALUE instanceof Object && !_VALUE instanceof Date) {
                        if (_VALUE.length > _RULES_PARAMETER) {
                            return _CUSTOM_MESSAGE || 'data maksimal array adalah ' + _RULES_PARAMETER
                        }
                    }
                    if (length > _RULES_PARAMETER) {
                        return _CUSTOM_MESSAGE || 'data maksimal karakter adalah ' + _RULES_PARAMETER
                    }
                }
    
                function phone() {
                    _RULES_PARAMETER = /^0[1-9]\d+/g
                    return regex()
                }
    
                function email() {
                    _RULES_PARAMETER = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
                    return regex()
                }
    
                function regex() {
                    if (!_VALUE || !_RULES_PARAMETER) throw {status: 400, message: 'value or RegExp rules undefined'}
                    var _CLEAN_REGEX = _RULES_PARAMETER.slice(1, _RULES_PARAMETER.length - 1)
                    var match = _CLEAN_REGEX.match(new RegExp('^/(.*?)/([gimuy]*)$'));
                    var regex = new RegExp(match[1], match[2]);
                    regex = new RegExp(regex)
                    if (!regex.test(_VALUE)) return _CUSTOM_MESSAGE || 'format data tidak sesuai'
                }
    
                /**
                 * Validate Function for Return
                 * @TODO make recursive function to call validation function rules (done)
                 */
    
                function validate(data_object, _callback) {
                    try {
                        if (!data_object) throw {status: 400, message: 'empty'};
                        if (Array.isArray(data_object) || !(data_object instanceof Object)) throw {status: 400, message: 'should object'};
                        var key_iterator, _RULES, _CLEAN_RULES, _SPLITE_RULES, _ASSIGN_FUNCTION;
                        _RESULT = {}
                        for (key_iterator in data_object) {
                            _RULES = _SCHEMA[key_iterator]
                            if (_RULES) {
                                // _CLEAN_RULES = _RULES.replace(/(\|{2}|[^a-zA-Z0-9|-])/gm, '')
                                _CLEAN_RULES = _RULES.replace(/(^\||\|{2}|\s|\|$)/gm, '')
                                if (_CLEAN_RULES[_CLEAN_RULES.length - 1] === '|') _CLEAN_RULES = _CLEAN_RULES.slice(0, _CLEAN_RULES.length - 1)
                                _SPLITE_RULES = _CLEAN_RULES.split('|')
                                _VALUE = data_object[key_iterator]
                                _SAMEAS_VALUE[key_iterator] = _VALUE
                                if (_VALUE instanceof Object) {
                                    if (_VALUE.hasOwnProperty('field')) {
                                        _CUSTOM_MESSAGE = _VALUE.field
                                        _SAMEAS_VALUE[key_iterator] = _VALUE
                                    } else {
                                        _CUSTOM_MESSAGE = key_iterator
                                    }
                                }
                                // console.log("validate -> _SPLITE_RULES", _SPLITE_RULES)
                                _ASSIGN_FUNCTION = _call_validation(_SPLITE_RULES)
                                _CUSTOM_MESSAGE = ''
                                if (_ASSIGN_FUNCTION) {
                                    _RESULT[key_iterator] = _ASSIGN_FUNCTION
                                    continue
                                }
                            }
                        }
                        if (_callback) return _callback({status: 200, message: 'Success', data: (Object.keys(_RESULT)).length ? _RESULT : null})
                        return {status: 200, message: 'Success', data: (Object.keys(_RESULT)).length ? _RESULT : null}
                    } catch (errors) {
                        const {status, message} = errors
                        return {status: status || 500, message: message || 'error'}
                    }
                }
    
                /**
                 * [pemanggilan fungsi validasi secara rekursif]
                 *
                 * @param   {[Array]}  _ARRAY_OF_RULES  [list array rules yang dilempar secara rekursif]
                 * @TODO bind _THIS to validation function list (temporary)
                 * @return  {[String]}                   [memberikan return berbentuk string]
                 */
                function _call_validation(_ARRAY_OF_RULES) {
                    if (!(Array.isArray(_ARRAY_OF_RULES)) && !(_ARRAY_OF_RULES instanceof Object)) throw 'should array'
                    if (_ARRAY_OF_RULES.length) {
                        var _FUNCTION
                        if (_ARRAY_OF_RULES[0].search('-') > 0) {
                            _FUNCTION = _THIS[_ARRAY_OF_RULES[0].slice(0, _ARRAY_OF_RULES[0].search('-'))]
                            // console.log("_call_validation -> _FUNCTION", _FUNCTION)
                            _RULES_PARAMETER = _ARRAY_OF_RULES[0].slice((_ARRAY_OF_RULES[0].search('-') + 1), _ARRAY_OF_RULES[0].length)
                        } else {
                            _FUNCTION = _THIS[_ARRAY_OF_RULES[0]]
                        }
                        if (!_FUNCTION) throw {status: 500, message: 'undefined function'}
                        /**
                         * [determine for custom message]
                         */
                        if (_VALUE instanceof Object) {
                            if (_VALUE.hasOwnProperty('rules') && _VALUE.rules.hasOwnProperty(_ARRAY_OF_RULES[0])) {
                                var _MESSAGE = _VALUE.rules[_ARRAY_OF_RULES[0]]
                                var _FIELD = _CUSTOM_MESSAGE.slice()
                                _CUSTOM_MESSAGE = _MESSAGE.replace(/{{field}}/g, _FIELD)
                            } else _CUSTOM_MESSAGE = ''
                            _VALUE = _VALUE.value
                        }
                        // console.log(_ARRAY_OF_RULES)
                        _FUNCTION = _FUNCTION()
                        // console.log(_FUNCTION, _VALUE, _SCHEMA)
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
                var error_message = {status: status || 500, message: message || 'error'}
                console.log(error_message)
                return error_message
            }
        }
    }
})()