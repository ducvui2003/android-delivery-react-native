//
//  CountryCodes.swift
//  Created by Simon Minton on 26/10/2023.
//

import Foundation

struct Country: Identifiable, Hashable {
    let id = UUID()
    let name: String
    let flag: String
    let regionCode: String
    let dialCode: String
}

let countries: [Country] = [
      Country(
        name: "Afghanistan",
        flag: "🇦🇫",
        regionCode: "AF",
        dialCode: "+93"
      ),
      Country(
        name: "Åland Islands",
        flag: "🇦🇽",
        regionCode: "AX",
        dialCode: "+358"
      ),
      Country(
        name: "Albania",
        flag: "🇦🇱",
        regionCode: "AL",
        dialCode: "+355"
      ),
      Country(
        name: "Algeria",
        flag: "🇩🇿",
        regionCode: "DZ",
        dialCode: "+213"
      ),
      Country(
        name: "American Samoa",
        flag: "🇦🇸",
        regionCode: "AS",
        dialCode: "+1684"
      ),
      Country(
        name: "Andorra",
        flag: "🇦🇩",
        regionCode: "AD",
        dialCode: "+376"
      ),
      Country(
        name: "Angola",
        flag: "🇦🇴",
        regionCode: "AO",
        dialCode: "+244"
      ),
      Country(
        name: "Anguilla",
        flag: "🇦🇮",
        regionCode: "AI",
        dialCode: "+1264"
      ),
      Country(
        name: "Antarctica",
        flag: "🇦🇶",
        regionCode: "AQ",
        dialCode: "+672"
      ),
      Country(
        name: "Antigua and Barbuda",
        flag: "🇦🇬",
        regionCode: "AG",
        dialCode: "+1268"
      ),
      Country(
        name: "Argentina",
        flag: "🇦🇷",
        regionCode: "AR",
        dialCode: "+54"
      ),
      Country(
        name: "Armenia",
        flag: "🇦🇲",
        regionCode: "AM",
        dialCode: "+374"
      ),
      Country(
        name: "Aruba",
        flag: "🇦🇼",
        regionCode: "AW",
        dialCode: "+297"
      ),
      Country(
        name: "Australia",
        flag: "🇦🇺",
        regionCode: "AU",
        dialCode: "+61"
      ),
      Country(
        name: "Austria",
        flag: "🇦🇹",
        regionCode: "AT",
        dialCode: "+43"
      ),
      Country(
        name: "Azerbaijan",
        flag: "🇦🇿",
        regionCode: "AZ",
        dialCode: "+994"
      ),
      Country(
        name: "Bahamas",
        flag: "🇧🇸",
        regionCode: "BS",
        dialCode: "+1242"
      ),
      Country(
        name: "Bahrain",
        flag: "🇧🇭",
        regionCode: "BH",
        dialCode: "+973"
      ),
      Country(
        name: "Bangladesh",
        flag: "🇧🇩",
        regionCode: "BD",
        dialCode: "+880"
      ),
      Country(
        name: "Barbados",
        flag: "🇧🇧",
        regionCode: "BB",
        dialCode: "+1246"
      ),
      Country(
        name: "Belarus",
        flag: "🇧🇾",
        regionCode: "BY",
        dialCode: "+375"
      ),
      Country(
        name: "Belgium",
        flag: "🇧🇪",
        regionCode: "BE",
        dialCode: "+32"
      ),
      Country(
        name: "Belize",
        flag: "🇧🇿",
        regionCode: "BZ",
        dialCode: "+501"
      ),
      Country(
        name: "Benin",
        flag: "🇧🇯",
        regionCode: "BJ",
        dialCode: "+229"
      ),
      Country(
        name: "Bermuda",
        flag: "🇧🇲",
        regionCode: "BM",
        dialCode: "+1441"
      ),
      Country(
        name: "Bhutan",
        flag: "🇧🇹",
        regionCode: "BT",
        dialCode: "+975"
      ),
      Country(
        name: "Bolivia, Plurinational State of bolivia",
        flag: "🇧🇴",
        regionCode: "BO",
        dialCode: "+591"
      ),
      Country(
        name: "Bosnia and Herzegovina",
        flag: "🇧🇦",
        regionCode: "BA",
        dialCode: "+387"
      ),
      Country(
        name: "Botswana",
        flag: "🇧🇼",
        regionCode: "BW",
        dialCode: "+267"
      ),
      Country(
        name: "Bouvet Island",
        flag: "🇧🇻",
        regionCode: "BV",
        dialCode: "+47"
      ),
      Country(
        name: "Brazil",
        flag: "🇧🇷",
        regionCode: "BR",
        dialCode: "+55"
      ),
      Country(
        name: "British Indian Ocean Territory",
        flag: "🇮🇴",
        regionCode: "IO",
        dialCode: "+246"
      ),
      Country(
        name: "Brunei Darussalam",
        flag: "🇧🇳",
        regionCode: "BN",
        dialCode: "+673"
      ),
      Country(
        name: "Bulgaria",
        flag: "🇧🇬",
        regionCode: "BG",
        dialCode: "+359"
      ),
      Country(
        name: "Burkina Faso",
        flag: "🇧🇫",
        regionCode: "BF",
        dialCode: "+226"
      ),
      Country(
        name: "Burundi",
        flag: "🇧🇮",
        regionCode: "BI",
        dialCode: "+257"
      ),
      Country(
        name: "Cambodia",
        flag: "🇰🇭",
        regionCode: "KH",
        dialCode: "+855"
      ),
      Country(
        name: "Cameroon",
        flag: "🇨🇲",
        regionCode: "CM",
        dialCode: "+237"
      ),
      Country(
        name: "Canada",
        flag: "🇨🇦",
        regionCode: "CA",
        dialCode: "+1"
      ),
      Country(
        name: "Cape Verde",
        flag: "🇨🇻",
        regionCode: "CV",
        dialCode: "+238"
      ),
      Country(
        name: "Cayman Islands",
        flag: "🇰🇾",
        regionCode: "KY",
        dialCode: "+345"
      ),
      Country(
        name: "Central African Republic",
        flag: "🇨🇫",
        regionCode: "CF",
        dialCode: "+236"
      ),
      Country(
        name: "Chad",
        flag: "🇹🇩",
        regionCode: "TD",
        dialCode: "+235"
      ),
      Country(
        name: "Chile",
        flag: "🇨🇱",
        regionCode: "CL",
        dialCode: "+56"
      ),
      Country(
        name: "China",
        flag: "🇨🇳",
        regionCode: "CN",
        dialCode: "+86"
      ),
      Country(
        name: "Christmas Island",
        flag: "🇨🇽",
        regionCode: "CX",
        dialCode: "+61"
      ),
      Country(
        name: "Cocos (Keeling) Islands",
        flag: "🇨🇨",
        regionCode: "CC",
        dialCode: "+61"
      ),
      Country(
        name: "Colombia",
        flag: "🇨🇴",
        regionCode: "CO",
        dialCode: "+57"
      ),
      Country(
        name: "Comoros",
        flag: "🇰🇲",
        regionCode: "KM",
        dialCode: "+269"
      ),
      Country(
        name: "Congo",
        flag: "🇨🇬",
        regionCode: "CG",
        dialCode: "+242"
      ),
      Country(
        name: "Congo, The Democratic Republic of the Congo",
        flag: "🇨🇩",
        regionCode: "CD",
        dialCode: "+243"
      ),
      Country(
        name: "Cook Islands",
        flag: "🇨🇰",
        regionCode: "CK",
        dialCode: "+682"
      ),
      Country(
        name: "Costa Rica",
        flag: "🇨🇷",
        regionCode: "CR",
        dialCode: "+506"
      ),
      Country(
        name: "Cote d'Ivoire",
        flag: "🇨🇮",
        regionCode: "CI",
        dialCode: "+225"
      ),
      Country(
        name: "Croatia",
        flag: "🇭🇷",
        regionCode: "HR",
        dialCode: "+385"
      ),
      Country(
        name: "Cuba",
        flag: "🇨🇺",
        regionCode: "CU",
        dialCode: "+53"
      ),
      Country(
        name: "Cyprus",
        flag: "🇨🇾",
        regionCode: "CY",
        dialCode: "+357"
      ),
      Country(
        name: "Czech Republic",
        flag: "🇨🇿",
        regionCode: "CZ",
        dialCode: "+420"
      ),
      Country(
        name: "Denmark",
        flag: "🇩🇰",
        regionCode: "DK",
        dialCode: "+45"
      ),
      Country(
        name: "Djibouti",
        flag: "🇩🇯",
        regionCode: "DJ",
        dialCode: "+253"
      ),
      Country(
        name: "Dominica",
        flag: "🇩🇲",
        regionCode: "DM",
        dialCode: "+1767"
      ),
      Country(
        name: "Dominican Republic",
        flag: "🇩🇴",
        regionCode: "DO",
        dialCode: "+1849"
      ),
      Country(
        name: "Ecuador",
        flag: "🇪🇨",
        regionCode: "EC",
        dialCode: "+593"
      ),
      Country(
        name: "Egypt",
        flag: "🇪🇬",
        regionCode: "EG",
        dialCode: "+20"
      ),
      Country(
        name: "El Salvador",
        flag: "🇸🇻",
        regionCode: "SV",
        dialCode: "+503"
      ),
      Country(
        name: "Equatorial Guinea",
        flag: "🇬🇶",
        regionCode: "GQ",
        dialCode: "+240"
      ),
      Country(
        name: "Eritrea",
        flag: "🇪🇷",
        regionCode: "ER",
        dialCode: "+291"
      ),
      Country(
        name: "Estonia",
        flag: "🇪🇪",
        regionCode: "EE",
        dialCode: "+372"
      ),
      Country(
        name: "Ethiopia",
        flag: "🇪🇹",
        regionCode: "ET",
        dialCode: "+251"
      ),
      Country(
        name: "Falkland Islands (Malvinas)",
        flag: "🇫🇰",
        regionCode: "FK",
        dialCode: "+500"
      ),
      Country(
        name: "Faroe Islands",
        flag: "🇫🇴",
        regionCode: "FO",
        dialCode: "+298"
      ),
      Country(
        name: "Fiji",
        flag: "🇫🇯",
        regionCode: "FJ",
        dialCode: "+679"
      ),
      Country(
        name: "Finland",
        flag: "🇫🇮",
        regionCode: "FI",
        dialCode: "+358"
      ),
      Country(
        name: "France",
        flag: "🇫🇷",
        regionCode: "FR",
        dialCode: "+33"
      ),
      Country(
        name: "French Guiana",
        flag: "🇬🇫",
        regionCode: "GF",
        dialCode: "+594"
      ),
      Country(
        name: "French Polynesia",
        flag: "🇵🇫",
        regionCode: "PF",
        dialCode: "+689"
      ),
      Country(
        name: "French Southern Territories",
        flag: "🇹🇫",
        regionCode: "TF",
        dialCode: "+262"
      ),
      Country(
        name: "Gabon",
        flag: "🇬🇦",
        regionCode: "GA",
        dialCode: "+241"
      ),
      Country(
        name: "Gambia",
        flag: "🇬🇲",
        regionCode: "GM",
        dialCode: "+220"
      ),
      Country(
        name: "Georgia",
        flag: "🇬🇪",
        regionCode: "GE",
        dialCode: "+995"
      ),
      Country(
        name: "Germany",
        flag: "🇩🇪",
        regionCode: "DE",
        dialCode: "+49"
      ),
      Country(
        name: "Ghana",
        flag: "🇬🇭",
        regionCode: "GH",
        dialCode: "+233"
      ),
      Country(
        name: "Gibraltar",
        flag: "🇬🇮",
        regionCode: "GI",
        dialCode: "+350"
      ),
      Country(
        name: "Greece",
        flag: "🇬🇷",
        regionCode: "GR",
        dialCode: "+30"
      ),
      Country(
        name: "Greenland",
        flag: "🇬🇱",
        regionCode: "GL",
        dialCode: "+299"
      ),
      Country(
        name: "Grenada",
        flag: "🇬🇩",
        regionCode: "GD",
        dialCode: "+1473"
      ),
      Country(
        name: "Guadeloupe",
        flag: "🇬🇵",
        regionCode: "GP",
        dialCode: "+590"
      ),
      Country(
        name: "Guam",
        flag: "🇬🇺",
        regionCode: "GU",
        dialCode: "+1671"
      ),
      Country(
        name: "Guatemala",
        flag: "🇬🇹",
        regionCode: "GT",
        dialCode: "+502"
      ),
      Country(
        name: "Guernsey",
        flag: "🇬🇬",
        regionCode: "GG",
        dialCode: "+44"
      ),
      Country(
        name: "Guinea",
        flag: "🇬🇳",
        regionCode: "GN",
        dialCode: "+224"
      ),
      Country(
        name: "Guinea-Bissau",
        flag: "🇬🇼",
        regionCode: "GW",
        dialCode: "+245"
      ),
      Country(
        name: "Guyana",
        flag: "🇬🇾",
        regionCode: "GY",
        dialCode: "+592"
      ),
      Country(
        name: "Haiti",
        flag: "🇭🇹",
        regionCode: "HT",
        dialCode: "+509"
      ),
      Country(
        name: "Heard Island and Mcdonald Islands",
        flag: "🇭🇲",
        regionCode: "HM",
        dialCode: "+672"
      ),
      Country(
        name: "Holy See (Vatican City State)",
        flag: "🇻🇦",
        regionCode: "VA",
        dialCode: "+379"
      ),
      Country(
        name: "Honduras",
        flag: "🇭🇳",
        regionCode: "HN",
        dialCode: "+504"
      ),
      Country(
        name: "Hong Kong",
        flag: "🇭🇰",
        regionCode: "HK",
        dialCode: "+852"
      ),
      Country(
        name: "Hungary",
        flag: "🇭🇺",
        regionCode: "HU",
        dialCode: "+36"
      ),
      Country(
        name: "Iceland",
        flag: "🇮🇸",
        regionCode: "IS",
        dialCode: "+354"
      ),
      Country(
        name: "India",
        flag: "🇮🇳",
        regionCode: "IN",
        dialCode: "+91"
      ),
      Country(
        name: "Indonesia",
        flag: "🇮🇩",
        regionCode: "ID",
        dialCode: "+62"
      ),
      Country(
        name: "Iran, Islamic Republic of Persian Gulf",
        flag: "🇮🇷",
        regionCode: "IR",
        dialCode: "+98"
      ),
      Country(
        name: "Iraq",
        flag: "🇮🇶",
        regionCode: "IQ",
        dialCode: "+964"
      ),
      Country(
        name: "Ireland",
        flag: "🇮🇪",
        regionCode: "IE",
        dialCode: "+353"
      ),
      Country(
        name: "Isle of Man",
        flag: "🇮🇲",
        regionCode: "IM",
        dialCode: "+44"
      ),
      Country(
        name: "Israel",
        flag: "🇮🇱",
        regionCode: "IL",
        dialCode: "+972"
      ),
      Country(
        name: "Italy",
        flag: "🇮🇹",
        regionCode: "IT",
        dialCode: "+39"
      ),
      Country(
        name: "Jamaica",
        flag: "🇯🇲",
        regionCode: "JM",
        dialCode: "+1876"
      ),
      Country(
        name: "Japan",
        flag: "🇯🇵",
        regionCode: "JP",
        dialCode: "+81"
      ),
      Country(
        name: "Jersey",
        flag: "🇯🇪",
        regionCode: "JE",
        dialCode: "+44"
      ),
      Country(
        name: "Jordan",
        flag: "🇯🇴",
        regionCode: "JO",
        dialCode: "+962"
      ),
      Country(
        name: "Kazakhstan",
        flag: "🇰🇿",
        regionCode: "KZ",
        dialCode: "+7"
      ),
      Country(
        name: "Kenya",
        flag: "🇰🇪",
        regionCode: "KE",
        dialCode: "+254"
      ),
      Country(
        name: "Kiribati",
        flag: "🇰🇮",
        regionCode: "KI",
        dialCode: "+686"
      ),
      Country(
        name: "Korea, Democratic People's Republic of Korea",
        flag: "🇰🇵",
        regionCode: "KP",
        dialCode: "+850"
      ),
      Country(
        name: "Korea, Republic of South Korea",
        flag: "🇰🇷",
        regionCode: "KR",
        dialCode: "+82"
      ),
      Country(
        name: "Kosovo",
        flag: "🇽🇰",
        regionCode: "XK",
        dialCode: "+383"
      ),
      Country(
        name: "Kuwait",
        flag: "🇰🇼",
        regionCode: "KW",
        dialCode: "+965"
      ),
      Country(
        name: "Kyrgyzstan",
        flag: "🇰🇬",
        regionCode: "KG",
        dialCode: "+996"
      ),
      Country(
        name: "Laos",
        flag: "🇱🇦",
        regionCode: "LA",
        dialCode: "+856"
      ),
      Country(
        name: "Latvia",
        flag: "🇱🇻",
        regionCode: "LV",
        dialCode: "+371"
      ),
      Country(
        name: "Lebanon",
        flag: "🇱🇧",
        regionCode: "LB",
        dialCode: "+961"
      ),
      Country(
        name: "Lesotho",
        flag: "🇱🇸",
        regionCode: "LS",
        dialCode: "+266"
      ),
      Country(
        name: "Liberia",
        flag: "🇱🇷",
        regionCode: "LR",
        dialCode: "+231"
      ),
      Country(
        name: "Libyan Arab Jamahiriya",
        flag: "🇱🇾",
        regionCode: "LY",
        dialCode: "+218"
      ),
      Country(
        name: "Liechtenstein",
        flag: "🇱🇮",
        regionCode: "LI",
        dialCode: "+423"
      ),
      Country(
        name: "Lithuania",
        flag: "🇱🇹",
        regionCode: "LT",
        dialCode: "+370"
      ),
      Country(
        name: "Luxembourg",
        flag: "🇱🇺",
        regionCode: "LU",
        dialCode: "+352"
      ),
      Country(
        name: "Macao",
        flag: "🇲🇴",
        regionCode: "MO",
        dialCode: "+853"
      ),
      Country(
        name: "Macedonia",
        flag: "🇲🇰",
        regionCode: "MK",
        dialCode: "+389"
      ),
      Country(
        name: "Madagascar",
        flag: "🇲🇬",
        regionCode: "MG",
        dialCode: "+261"
      ),
      Country(
        name: "Malawi",
        flag: "🇲🇼",
        regionCode: "MW",
        dialCode: "+265"
      ),
      Country(
        name: "Malaysia",
        flag: "🇲🇾",
        regionCode: "MY",
        dialCode: "+60"
      ),
      Country(
        name: "Maldives",
        flag: "🇲🇻",
        regionCode: "MV",
        dialCode: "+960"
      ),
      Country(
        name: "Mali",
        flag: "🇲🇱",
        regionCode: "ML",
        dialCode: "+223"
      ),
      Country(
        name: "Malta",
        flag: "🇲🇹",
        regionCode: "MT",
        dialCode: "+356"
      ),
      Country(
        name: "Marshall Islands",
        flag: "🇲🇭",
        regionCode: "MH",
        dialCode: "+692"
      ),
      Country(
        name: "Martinique",
        flag: "🇲🇶",
        regionCode: "MQ",
        dialCode: "+596"
      ),
      Country(
        name: "Mauritania",
        flag: "🇲🇷",
        regionCode: "MR",
        dialCode: "+222"
      ),
      Country(
        name: "Mauritius",
        flag: "🇲🇺",
        regionCode: "MU",
        dialCode: "+230"
      ),
      Country(
        name: "Mayotte",
        flag: "🇾🇹",
        regionCode: "YT",
        dialCode: "+262"
      ),
      Country(
        name: "Mexico",
        flag: "🇲🇽",
        regionCode: "MX",
        dialCode: "+52"
      ),
      Country(
        name: "Micronesia, Federated States of Micronesia",
        flag: "🇫🇲",
        regionCode: "FM",
        dialCode: "+691"
      ),
      Country(
        name: "Moldova",
        flag: "🇲🇩",
        regionCode: "MD",
        dialCode: "+373"
      ),
      Country(
        name: "Monaco",
        flag: "🇲🇨",
        regionCode: "MC",
        dialCode: "+377"
      ),
      Country(
        name: "Mongolia",
        flag: "🇲🇳",
        regionCode: "MN",
        dialCode: "+976"
      ),
      Country(
        name: "Montenegro",
        flag: "🇲🇪",
        regionCode: "ME",
        dialCode: "+382"
      ),
      Country(
        name: "Montserrat",
        flag: "🇲🇸",
        regionCode: "MS",
        dialCode: "+1664"
      ),
      Country(
        name: "Morocco",
        flag: "🇲🇦",
        regionCode: "MA",
        dialCode: "+212"
      ),
      Country(
        name: "Mozambique",
        flag: "🇲🇿",
        regionCode: "MZ",
        dialCode: "+258"
      ),
      Country(
        name: "Myanmar",
        flag: "🇲🇲",
        regionCode: "MM",
        dialCode: "+95"
      ),
      Country(
        name: "Namibia",
        flag: "🇳🇦",
        regionCode: "NA",
        dialCode: "+264"
      ),
      Country(
        name: "Nauru",
        flag: "🇳🇷",
        regionCode: "NR",
        dialCode: "+674"
      ),
      Country(
        name: "Nepal",
        flag: "🇳🇵",
        regionCode: "NP",
        dialCode: "+977"
      ),
      Country(
        name: "Netherlands",
        flag: "🇳🇱",
        regionCode: "NL",
        dialCode: "+31"
      ),
      Country(
        name: "Netherlands Antilles",
        flag: "",
        regionCode: "AN",
        dialCode: "+599"
      ),
      Country(
        name: "New Caledonia",
        flag: "🇳🇨",
        regionCode: "NC",
        dialCode: "+687"
      ),
      Country(
        name: "New Zealand",
        flag: "🇳🇿",
        regionCode: "NZ",
        dialCode: "+64"
      ),
      Country(
        name: "Nicaragua",
        flag: "🇳🇮",
        regionCode: "NI",
        dialCode: "+505"
      ),
      Country(
        name: "Niger",
        flag: "🇳🇪",
        regionCode: "NE",
        dialCode: "+227"
      ),
      Country(
        name: "Nigeria",
        flag: "🇳🇬",
        regionCode: "NG",
        dialCode: "+234"
      ),
      Country(
        name: "Niue",
        flag: "🇳🇺",
        regionCode: "NU",
        dialCode: "+683"
      ),
      Country(
        name: "Norfolk Island",
        flag: "🇳🇫",
        regionCode: "NF",
        dialCode: "+672"
      ),
      Country(
        name: "Northern Mariana Islands",
        flag: "🇲🇵",
        regionCode: "MP",
        dialCode: "+1670"
      ),
      Country(
        name: "Norway",
        flag: "🇳🇴",
        regionCode: "NO",
        dialCode: "+47"
      ),
      Country(
        name: "Oman",
        flag: "🇴🇲",
        regionCode: "OM",
        dialCode: "+968"
      ),
      Country(
        name: "Pakistan",
        flag: "🇵🇰",
        regionCode: "PK",
        dialCode: "+92"
      ),
      Country(
        name: "Palau",
        flag: "🇵🇼",
        regionCode: "PW",
        dialCode: "+680"
      ),
      Country(
        name: "Palestinian Territory, Occupied",
        flag: "🇵🇸",
        regionCode: "PS",
        dialCode: "+970"
      ),
      Country(
        name: "Panama",
        flag: "🇵🇦",
        regionCode: "PA",
        dialCode: "+507"
      ),
      Country(
        name: "Papua New Guinea",
        flag: "🇵🇬",
        regionCode: "PG",
        dialCode: "+675"
      ),
      Country(
        name: "Paraguay",
        flag: "🇵🇾",
        regionCode: "PY",
        dialCode: "+595"
      ),
      Country(
        name: "Peru",
        flag: "🇵🇪",
        regionCode: "PE",
        dialCode: "+51"
      ),
      Country(
        name: "Philippines",
        flag: "🇵🇭",
        regionCode: "PH",
        dialCode: "+63"
      ),
      Country(
        name: "Pitcairn",
        flag: "🇵🇳",
        regionCode: "PN",
        dialCode: "+64"
      ),
      Country(
        name: "Poland",
        flag: "🇵🇱",
        regionCode: "PL",
        dialCode: "+48"
      ),
      Country(
        name: "Portugal",
        flag: "🇵🇹",
        regionCode: "PT",
        dialCode: "+351"
      ),
      Country(
        name: "Puerto Rico",
        flag: "🇵🇷",
        regionCode: "PR",
        dialCode: "+1939"
      ),
      Country(
        name: "Qatar",
        flag: "🇶🇦",
        regionCode: "QA",
        dialCode: "+974"
      ),
      Country(
        name: "Romania",
        flag: "🇷🇴",
        regionCode: "RO",
        dialCode: "+40"
      ),
      Country(
        name: "Russia",
        flag: "🇷🇺",
        regionCode: "RU",
        dialCode: "+7"
      ),
      Country(
        name: "Rwanda",
        flag: "🇷🇼",
        regionCode: "RW",
        dialCode: "+250"
      ),
      Country(
        name: "Reunion",
        flag: "🇷🇪",
        regionCode: "RE",
        dialCode: "+262"
      ),
      Country(
        name: "Saint Barthelemy",
        flag: "🇧🇱",
        regionCode: "BL",
        dialCode: "+590"
      ),
      Country(
        name: "Saint Helena, Ascension and Tristan Da Cunha",
        flag: "🇸🇭",
        regionCode: "SH",
        dialCode: "+290"
      ),
      Country(
        name: "Saint Kitts and Nevis",
        flag: "🇰🇳",
        regionCode: "KN",
        dialCode: "+1869"
      ),
      Country(
        name: "Saint Lucia",
        flag: "🇱🇨",
        regionCode: "LC",
        dialCode: "+1758"
      ),
      Country(
        name: "Saint Martin",
        flag: "🇲🇫",
        regionCode: "MF",
        dialCode: "+590"
      ),
      Country(
        name: "Saint Pierre and Miquelon",
        flag: "🇵🇲",
        regionCode: "PM",
        dialCode: "+508"
      ),
      Country(
        name: "Saint Vincent and the Grenadines",
        flag: "🇻🇨",
        regionCode: "VC",
        dialCode: "+1784"
      ),
      Country(
        name: "Samoa",
        flag: "🇼🇸",
        regionCode: "WS",
        dialCode: "+685"
      ),
      Country(
        name: "San Marino",
        flag: "🇸🇲",
        regionCode: "SM",
        dialCode: "+378"
      ),
      Country(
        name: "Sao Tome and Principe",
        flag: "🇸🇹",
        regionCode: "ST",
        dialCode: "+239"
      ),
      Country(
        name: "Saudi Arabia",
        flag: "🇸🇦",
        regionCode: "SA",
        dialCode: "+966"
      ),
      Country(
        name: "Senegal",
        flag: "🇸🇳",
        regionCode: "SN",
        dialCode: "+221"
      ),
      Country(
        name: "Serbia",
        flag: "🇷🇸",
        regionCode: "RS",
        dialCode: "+381"
      ),
      Country(
        name: "Seychelles",
        flag: "🇸🇨",
        regionCode: "SC",
        dialCode: "+248"
      ),
      Country(
        name: "Sierra Leone",
        flag: "🇸🇱",
        regionCode: "SL",
        dialCode: "+232"
      ),
      Country(
        name: "Singapore",
        flag: "🇸🇬",
        regionCode: "SG",
        dialCode: "+65"
      ),
      Country(
        name: "Slovakia",
        flag: "🇸🇰",
        regionCode: "SK",
        dialCode: "+421"
      ),
      Country(
        name: "Slovenia",
        flag: "🇸🇮",
        regionCode: "SI",
        dialCode: "+386"
      ),
      Country(
        name: "Solomon Islands",
        flag: "🇸🇧",
        regionCode: "SB",
        dialCode: "+677"
      ),
      Country(
        name: "Somalia",
        flag: "🇸🇴",
        regionCode: "SO",
        dialCode: "+252"
      ),
      Country(
        name: "South Africa",
        flag: "🇿🇦",
        regionCode: "ZA",
        dialCode: "+27"
      ),
      Country(
        name: "South Sudan",
        flag: "🇸🇸",
        regionCode: "SS",
        dialCode: "+211"
      ),
      Country(
        name: "South Georgia and the South Sandwich Islands",
        flag: "🇬🇸",
        regionCode: "GS",
        dialCode: "+500"
      ),
      Country(
        name: "Spain",
        flag: "🇪🇸",
        regionCode: "ES",
        dialCode: "+34"
      ),
      Country(
        name: "Sri Lanka",
        flag: "🇱🇰",
        regionCode: "LK",
        dialCode: "+94"
      ),
      Country(
        name: "Sudan",
        flag: "🇸🇩",
        regionCode: "SD",
        dialCode: "+249"
      ),
      Country(
        name: "Suriname",
        flag: "🇸🇷",
        regionCode: "SR",
        dialCode: "+597"
      ),
      Country(
        name: "Svalbard and Jan Mayen",
        flag: "🇸🇯",
        regionCode: "SJ",
        dialCode: "+47"
      ),
      Country(
        name: "Swaziland",
        flag: "🇸🇿",
        regionCode: "SZ",
        dialCode: "+268"
      ),
      Country(
        name: "Sweden",
        flag: "🇸🇪",
        regionCode: "SE",
        dialCode: "+46"
      ),
      Country(
        name: "Switzerland",
        flag: "🇨🇭",
        regionCode: "CH",
        dialCode: "+41"
      ),
      Country(
        name: "Syrian Arab Republic",
        flag: "🇸🇾",
        regionCode: "SY",
        dialCode: "+963"
      ),
      Country(
        name: "Taiwan",
        flag: "🇹🇼",
        regionCode: "TW",
        dialCode: "+886"
      ),
      Country(
        name: "Tajikistan",
        flag: "🇹🇯",
        regionCode: "TJ",
        dialCode: "+992"
      ),
      Country(
        name: "Tanzania, United Republic of Tanzania",
        flag: "🇹🇿",
        regionCode: "TZ",
        dialCode: "+255"
      ),
      Country(
        name: "Thailand",
        flag: "🇹🇭",
        regionCode: "TH",
        dialCode: "+66"
      ),
      Country(
        name: "Timor-Leste",
        flag: "🇹🇱",
        regionCode: "TL",
        dialCode: "+670"
      ),
      Country(
        name: "Togo",
        flag: "🇹🇬",
        regionCode: "TG",
        dialCode: "+228"
      ),
      Country(
        name: "Tokelau",
        flag: "🇹🇰",
        regionCode: "TK",
        dialCode: "+690"
      ),
      Country(
        name: "Tonga",
        flag: "🇹🇴",
        regionCode: "TO",
        dialCode: "+676"
      ),
      Country(
        name: "Trinidad and Tobago",
        flag: "🇹🇹",
        regionCode: "TT",
        dialCode: "+1868"
      ),
      Country(
        name: "Tunisia",
        flag: "🇹🇳",
        regionCode: "TN",
        dialCode: "+216"
      ),
      Country(
        name: "Turkey",
        flag: "🇹🇷",
        regionCode: "TR",
        dialCode: "+90"
      ),
      Country(
        name: "Turkmenistan",
        flag: "🇹🇲",
        regionCode: "TM",
        dialCode: "+993"
      ),
      Country(
        name: "Turks and Caicos Islands",
        flag: "🇹🇨",
        regionCode: "TC",
        dialCode: "+1649"
      ),
      Country(
        name: "Tuvalu",
        flag: "🇹🇻",
        regionCode: "TV",
        dialCode: "+688"
      ),
      Country(
        name: "Uganda",
        flag: "🇺🇬",
        regionCode: "UG",
        dialCode: "+256"
      ),
      Country(
        name: "Ukraine",
        flag: "🇺🇦",
        regionCode: "UA",
        dialCode: "+380"
      ),
      Country(
        name: "United Arab Emirates",
        flag: "🇦🇪",
        regionCode: "AE",
        dialCode: "+971"
      ),
      Country(
        name: "United Kingdom",
        flag: "🇬🇧",
        regionCode: "GB",
        dialCode: "+44"
      ),
      Country(
        name: "United States",
        flag: "🇺🇸",
        regionCode: "US",
        dialCode: "+1"
      ),
      Country(
        name: "Uruguay",
        flag: "🇺🇾",
        regionCode: "UY",
        dialCode: "+598"
      ),
      Country(
        name: "Uzbekistan",
        flag: "🇺🇿",
        regionCode: "UZ",
        dialCode: "+998"
      ),
      Country(
        name: "Vanuatu",
        flag: "🇻🇺",
        regionCode: "VU",
        dialCode: "+678"
      ),
      Country(
        name: "Venezuela, Bolivarian Republic of Venezuela",
        flag: "🇻🇪",
        regionCode: "VE",
        dialCode: "+58"
      ),
      Country(
        name: "Vietnam",
        flag: "🇻🇳",
        regionCode: "VN",
        dialCode: "+84"
      ),
      Country(
        name: "Virgin Islands, British",
        flag: "🇻🇬",
        regionCode: "VG",
        dialCode: "+1284"
      ),
      Country(
        name: "Virgin Islands, U.S.",
        flag: "🇻🇮",
        regionCode: "VI",
        dialCode: "+1340"
      ),
      Country(
        name: "Wallis and Futuna",
        flag: "🇼🇫",
        regionCode: "WF",
        dialCode: "+681"
      ),
      Country(
        name: "Yemen",
        flag: "🇾🇪",
        regionCode: "YE",
        dialCode: "+967"
      ),
      Country(
        name: "Zambia",
        flag: "🇿🇲",
        regionCode: "ZM",
        dialCode: "+260"
      ),
      Country(
        name: "Zimbabwe",
        flag: "🇿🇼",
        regionCode: "ZW",
        dialCode: "+263"
      ),
]
