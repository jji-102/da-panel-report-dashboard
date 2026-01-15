import React, { useState, useEffect, useMemo } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, PieChart, Pie, Cell, ComposedChart, Area
} from 'recharts';
import { 
  LayoutDashboard, Filter, Layers, DollarSign, Users, 
  Target, CheckCircle, Smartphone, AlertTriangle, Activity, 
  FileText, Clock, BarChart2, TrendingUp, ChevronDown, Calendar, Briefcase, Award, Zap, XCircle
} from 'lucide-react';

// --- Embedded Data (Updated with Rev3 Data) ---
const rawCsvData = `no,month,quater,year,project_no,project_type,project_name,category,product,quota,ap_complete,ap_complete_percent,meow_complete,meow_complete_percent,AP+Meow,%,fw_complete,fw_complete_percent,bad_sample,bad_sample_percent,Answers,Sent/Invite,Active_users,ir,loi,date_start,date_end,date_complete,kpi_39,MBOKAKR,working_day,fw_channel,ap_mobile,ap_3party,ap_rabbit,ap_pc,cint,ap_total_price_ap,total_thb,per_cpi_usd,per_cpi_thb
1,Jan,4'24,2025,67068,Project,"Pasport 2024 W3 (INDO), Pasport 2024 W3 (MY)",Auto,Auto,400,401,1.0025,0,0.0,401,1.0025,0,0.0,1,0.0024875621890547263,801,,,0.5860737618853176,4.5,2025-01-09,2025-01-13,2025-01-12,Pass,1.0025,4.0,Panel,1,1,0,1,0,1944.6,70005.6,4.849376558603491,174.5775561097257
2,Jan,4'24,2025,67367,Project,Shopping Online,SME,,500,333,0.666,137,0.274,470,0.94,113,0.226,59,0.15051020408163265,3486,,,0.1348250143430866,16.0,2025-01-07,2025-01-21,2025-01-21,Pass,0.94,15.0,Panel,1,0,1,0,0,2378.88,85639.68,5.061446808510638,182.21208510638297
3,Jan,4'24,2025,67371,Project,"Melody (Astaxanthin), Melody (Lutein), Melody (Mushroom)",Healthcare,Vitamin,340,179,0.5264705882352941,38,0.11176470588235295,217,0.638235294117647,226,0.6647058823529411,151,0.4575757575757576,2146,,,0.09931639401783006,14.666666666666666,2025-01-08,2025-01-27,2025-01-19,Pass,0.6325925925925925,12.0,Panel,1,0,1,0,0,846.72,30481.92,3.9019354838709677,140.46967741935484
4,Feb,4'24,2025,67376,Project,Ramiel,F&B,Coffee,3600,3125,0.8680555555555556,368,0.10222222222222223,3493,0.9702777777777778,96,0.02666666666666667,70,0.02190923317683881,6384,,,0.5471491228070176,26.0,2025-02-05,2025-02-26,2025-02-22,Pass,0.9702777777777776,18.0,Panel,1,1,1,1,0,16374.14,589469.04,4.687701116518752,168.75724019467506
5,Mar,4'24,2025,67068,Project,"Pasport 2024 W4 (MY), Pasport 2024 W4 (INDO)",Auto,Auto,400,426,1.065,0,0.0,426,1.065,0,0.0,12,0.0273972602739726,857,,,0.5613411715097171,4.5,2025-03-21,2025-03-23,2025-03-24,Not Pass,1.065,4.0,Panel,1,0,0,0,0,2137.7599999999998,76959.36,5.018215962441314,180.6557746478873
6,Mar,4'24,2025,67131,Project,ZAAB! W12,F&B,MSG,200,67,0.335,133,0.665,200,1.0,0,0.0,13,0.1625,796,,,0.2512562814070351,17.0,2025-02-27,2025-03-11,2025-03-03,Pass,1.0,5.0,Panel,1,1,1,1,0,447.52,16110.72,2.2376,80.5536
7,Mar,4'24,2025,68056,Project,Sylvester,F&B,Bird's nest,180,49,0.2722222222222222,71,0.39444444444444443,120,0.6666666666666666,65,0.3611111111111111,31,0.3875,949,,,0.1264488935721812,30.0,2025-03-12,2025-03-23,2025-03-22,Pass,0.6666666666666666,11.0,Panel,1,0,1,0,0,481.68,17340.48,4.014,144.504
8,Apr,1'25,2025,68069,Project,New Delhi,Digital Technology,Application,30,30,1.0,0,0.0,30,1.0,0,0.0,0,0.0,321,,,0.0934579439252336,8.0,2025-03-30,2025-03-31,2025-03-31,Pass,1.0,2.0,Panel,1,0,1,0,0,174.88,6295.68,5.8293333333333335,209.85600000000002
9,Apr,1'25,2025,68085,Project,ZAAB! W13,F&B,SMG,200,64,0.32,157,0.785,221,1.105,0,0.0,17,0.20987654320987653,379,,,0.58311345646438,18.0,2025-04-11,2025-04-26,2025-04-21,Pass,1.105,11.0,Panel,1,1,1,1,0,496.48,17873.28,2.2465158371040723,80.8745701357466
10,May,1'25,2025,68070,Project,"GEM APS Survey 2025, GEM APS Survey 2025 RC",Company,Agricultural,800,539,0.67375,153,0.19125,692,0.865,108,0.135,177,0.24720670391061453,4109,,,0.2805568343290427,8.5,2025-04-04,2025-05-23,2025-05-13,Pass,0.892,24.5,Panel,1,1,1,1,0,2018.88,72679.68000000001,2.917456647398844,105.0284393063584
11,May,1'25,2025,Incident Check,Incident Check,May2025 #1 Well-being GEN Z [Expense],Conversion starter,,200,165,0.825,0,0.0,165,0.825,0,0.0,0,0.0,165,,,1.0,1.0,2025-04-29,2025-04-30,2025-04-30,Pass,0.825,2.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
12,May,1'25,2025,Incident Check,Incident Check,May2025 #2 Well-being GEN Y [Expense],Conversion starter,,200,200,1.0,0,0.0,200,1.0,0,0.0,0,0.0,200,,,1.0,1.0,2025-04-29,2025-04-30,2025-04-30,Pass,1.0,2.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
13,May,1'25,2025,Incident Check,Incident Check,May2025 #3 Well-being GEN X [Expense],Conversion starter,,200,164,0.82,0,0.0,164,0.82,0,0.0,0,0.0,164,,,1.0,1.0,2025-04-29,2025-04-30,2025-04-30,Pass,0.82,2.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
14,June,1'25,2025,67113,Project,DUGA 2025,Company,Digital,500,273,0.546,227,0.454,500,1.0,0,0.0,0,0.0,671,,,0.7451564828614009,8.0,2025-05-14,2025-06-24,2025-06-24,Pass,1.0,42.0,Panel,1,0,1,0,0,1440.24,51848.64,2.88048,103.69727999999999
15,June,1'25,2025,Incident Check,Incident Check,June2025 #1 Beauty 1 [Expense],Cosmmetics,Beauty Clinic,200,201,1.005,0,0.0,201,1.005,0,0.0,0,0.0,201,,,1.0,1.0,2025-05-28,2025-06-04,2025-06-04,Pass,1.005,8.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
16,June,1'25,2025,Incident Check,Incident Check,June2025 #2 CATI Auto [Expense],Auto,Auto,200,200,1.0,0,0.0,200,1.0,0,0.0,0,0.0,200,,,1.0,1.0,2025-06-24,2025-06-24,2025-06-24,Pass,1.0,1.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
17,June,1'25,2025,Incident Check,Incident Check,June2025 #2 CATI Auto [Expense],Auto,Auto,200,200,1.0,0,0.0,200,1.0,0,0.0,0,0.0,200,,,1.0,1.0,2025-06-24,2025-06-24,2025-06-24,Pass,1.0,1.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
18,June,1'25,2025,Incident Check,Incident Check,June2025 #4 CATI Auto [Expense],Auto,Auto,200,202,1.01,0,0.0,202,1.01,0,0.0,0,0.0,202,,,1.0,1.0,2025-06-25,2025-06-25,2025-06-25,Pass,1.01,1.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
19,June,1'25,2025,Incident Check,Incident Check,June2025 #5 CATI Auto [Expense],Auto,Auto,200,200,1.0,0,0.0,200,1.0,0,0.0,0,0.0,200,,,1.0,1.0,2025-06-26,2025-06-26,2025-06-26,Pass,1.0,1.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
20,June,1'25,2025,Incident Check,Incident Check,June2025 #6 CATI Auto [Expense],Auto,Auto,200,201,1.005,0,0.0,201,1.005,0,0.0,0,0.0,201,,,1.0,1.0,2025-06-26,2025-06-27,2025-06-27,Pass,1.005,2.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
21,July,2'25,2025,68136,Project,Beverly hills II 2025,Insurance,Insurance,900,414,0.46,203,0.22555555555555556,617,0.6855555555555556,355,0.39444444444444443,119,0.22326454033771106,3256,,,0.1894963144963144,15.0,2025-06-23,2025-08-17,2025-07-07,Pass,0.6855555555555555,15.0,Panel,1,0,1,0,0,2800.8,100828.8,4.53938411669368,163.41782820097245
22,July,2'25,2025,68176,Project,PN Morning,F&B,Coffee,500,161,0.322,106,0.212,267,0.534,253,0.506,100,0.3831417624521073,2236,,,0.1194096601073345,11.0,2025-06-21,2025-07-01,2025-06-27,Pass,0.534,7.0,Panel,1,0,1,0,0,1149.44,41379.84,4.3050187265917605,154.98067415730335
23,July,2'25,2025,Incident Check,Incident Check,July2025 #1 EQ-WS-1 [Expense],Healthcare,Healthcare,200,200,1.0,0,0.0,200,1.0,0,0.0,0,0.0,200,,,1.0,3.0,2025-07-01,2025-07-02,2025-07-02,Pass,1.0,2.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
24,July,2'25,2025,Incident Check,Incident Check,July2025 #2 EQ-WS-2 [Expense],Healthcare,Healthcare,200,201,1.005,0,0.0,201,1.005,0,0.0,0,0.0,200,,,1.005,3.0,2025-07-02,2025-07-03,2025-07-03,Pass,1.005,2.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
25,July,2'25,2025,Incident Check,Incident Check,July2025 #3 EQ-WS-3 [Expense],Healthcare,Healthcare,200,199,0.995,0,0.0,199,0.995,0,0.0,0,0.0,200,,,0.995,3.0,2025-07-03,2025-07-04,2025-07-04,Pass,0.995,2.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
26,Aug,2'25,2025,68025,Project,"Passport 2025 W1 (INDO), Passport 2025 W1 (MY), Passport 2025 W1 (THA)",Auto,Auto,600,400,0.6666666666666666,200,0.3333333333333333,600,1.0,0,0.0,6,0.014778325123152709,1237,,,0.5630571353429153,5.0,2025-08-18,2025-08-20,2025-08-19,Pass,1.0,2.0,Panel,1,1,1,1,0,0.0,0.0,0.0,0.0
27,Aug,2'25,2025,68085,Project,ZAAB! Wave 14,F&B,MSG,200,168,0.84,85,0.425,253,1.265,0,0.0,29,0.14720812182741116,1068,,,0.2368913857677902,15.0,2025-07-25,2025-08-07,2025-08-07,Pass,1.265,14.0,Panel,1,1,1,1,0,0.0,0.0,0.0,0.0
28,Aug,2'25,2025,68092,Project,Istanbul,F&B,Noodle,500,323,0.646,279,0.558,602,1.204,90,0.18,0,0.0,2766,,,0.2176428054953,20.0,2025-07-25,2025-08-18,2025-08-19,Not Pass,1.2040000000000002,26.0,Panel,1,1,1,1,0,0.0,0.0,0.0,0.0
29,Aug,2'25,2025,68178,Project,Stuntman 2,F&B,Soft drink,400,345,0.8625,2,0.005,347,0.8675,218,0.545,103,0.22991071428571427,4972,,,0.0697908286403861,30.0,2025-07-25,2025-08-05,2025-08-07,Not Pass,0.8675,14.0,Panel,1,1,1,1,0,0.0,0.0,0.0,0.0
30,Aug,2'25,2025,68204,Project,Project V1 2025,Tourist,Tourist,800,371,0.46375,153,0.19125,524,0.655,314,0.3925,238,0.39080459770114945,2880,,,0.1819444444444444,20.0,2025-07-25,2025-08-04,2025-08-05,Not Pass,0.655,12.0,Panel,1,1,1,1,0,0.0,0.0,0.0,0.0
31,Aug,2'25,2025,68231,Project,Work Talk Japan,Company,Japan Company,200,64,0.32,87,0.435,151,0.755,0,0.0,0,0.0,200,,,0.755,10.0,2025-08-22,2025-08-29,2025-08-26,Pass,0.755,5.0,Panel,1,0,1,0,0,542.12,19516.32,3.590198675496689,129.2471523178808
32,Aug,2'25,2025,68248,Project,PN Presenter 6,F&B,Coffee,200,0,0.0,0,0.0,0,0.0,209,1.045,0,0.0,579,,,0.0,10.0,2025-08-11,2025-08-20,2025-08-20,Pass,0.0,10.0,Panel,1,0,1,0,0,0.0,0.0,0.0,0.0
33,Aug,2'25,2025,Incident Check,Incident Check,Aug2025 #1 V1 Region [Expense],Tourist,Tourist,200,200,1.0,0,0.0,200,1.0,0,0.0,0,0.0,200,,,1.0,3.0,2025-08-20,2025-08-20,2025-08-20,Pass,1.0,1.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
34,Sep,2'25,2025,67308,Project,Bath (Chaophraya),Healthcare,Hospital,200,58,0.29,39,0.195,97,0.485,105,0.525,36,0.3829787234042553,1748,,,0.0554919908466819,31.0,2025-09-02,2025-09-17,2025-09-15,Pass,0.485,14.0,Panel,1,1,1,1,0,754.82,27173.52,7.781649484536083,280.139381443299
35,Sep,2'25,2025,68265,Project,PN Morning 2,F&B,Coffee,200,193,0.965,24,0.12,217,1.085,30,0.15,1,0.005154639175257732,3423,,,0.0633946830265848,5.0,2025-08-29,2025-09-04,2025-09-03,Pass,1.085,6.0,Panel,1,1,1,1,0,1842.92,66345.12,8.492718894009217,305.7378801843318
36,Sep,2'25,2025,68273,Project,PN Laundry,Grocery,Washing powder,100,73,0.73,27,0.27,100,1.0,0,0.0,2,0.02666666666666667,1020,,,0.0980392156862745,8.0,2025-09-10,2025-09-11,2025-09-11,Pass,1.0,2.0,Panel,1,0,1,0,0,667.92,24045.12,6.6792,240.4512
37,Sep,2'25,2025,Incident Check,Incident Check,Sep2025 #1 Synegy Band [Expense],Healthcare,Pain relief cream,200,200,1.0,0,0.0,200,1.0,0,0.0,0,0.0,200,,,1.0,3.0,2025-09-12,2025-09-13,2025-09-13,Pass,1.0,2.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
38,Oct,3'25,2025,68085,Project,ZAAB! W15,F&B,MSG,200,252,1.26,0,0.0,252,1.26,0,0.0,0,0.0,487,,,0.5174537987679672,0.0,,,,Pass,1.26,1.0,Panel,1,0,0,0,0,1255.92,45213.12,4.983809523809524,179.41714285714286
39,Oct,3'25,2025,68211,Project,AdImpact  (OOH Media),Auto,Auto,1200,696,0.58,214,0.17833333333333334,910,0.7583333333333333,537,0.4475,69,0.09019607843137255,5295,,,0.1718602455146364,16.0,2025-09-12,2025-10-06,2025-09-29,Pass,0.7583333333333333,18.0,Panel,1,1,1,1,0,4779.26,172053.36000000002,5.2519340659340665,189.0696263736264
40,Oct,3'25,2025,68287,Project,Azalea,F&B,Plant-based milk,300,230,0.7666666666666667,0,0.0,230,0.7666666666666667,183,0.61,37,0.13857677902621723,873,,,0.263459335624284,26.0,2025-10-09,2025-10-19,2025-10-15,Pass,0.7666666666666667,7.0,Panel,1,0,0,0,0,1789.2,64411.2,7.7791304347826085,280.0486956521739
41,Oct,3'25,2025,68299,Project,"PN Laundry 2 Booster, PN Laundry 2 Re-call",Grocery,Laundry detergent,159,106,0.6666666666666666,65,0.4088050314465409,171,1.0754716981132075,0,0.0,7,0.061946902654867256,283,,,0.9047641688855077,3.5,2025-10-07,2025-10-13,2025-10-09,Pass,1.06,2.5,Panel,1,0,0,0,0,347.84000000000003,12522.239999999998,2.034152046783626,73.22947368421052
42,Oct,3'25,2025,68300,Project,Public Eye,Building materials,Cement,500,350,0.7,180,0.36,530,1.06,0,0.0,14,0.038461538461538464,1072,,,0.4944029850746268,8.0,2025-10-07,2025-10-09,2025-10-10,Not Pass,1.06,4.0,Panel,1,0,0,0,0,1730.16,62285.76,3.2644528301886795,117.52030188679245
43,Oct,3'25,2025,68318,Project,PN Period Night SS,Personal Care,Sanitary Pad,200,125,0.625,63,0.315,188,0.94,68,0.34,9,0.06716417910447761,1044,,,0.1800766283524904,8.0,2025-10-24,2025-10-28,2025-10-24,Pass,0.94,1.0,Panel,1,1,0,1,0,857.84,30882.24,4.562978723404256,164.2672340425532
44,Nov,3'25,2025,68025,Project,"Passport 2025 W2 (INDO), Passport 2025 W2 (MY), Passport 2025 W2 (THA)",Auto,Auto,600,410,0.6833333333333333,200,0.3333333333333333,610,1.0166666666666666,0,0.0,15,0.03529411764705882,1148,,,0.5836517439186969,4.0,,,,Pass,1.0166666666666666,1.0,Panel,1,1,1,1,0,2560.5299999999997,92179.07999999999,4.197590163934426,151.11324590163932
45,Nov,3'25,2025,68297,Project,Cambridge ,Research,Fashion,600,267,0.445,200,0.3333333333333333,467,0.7783333333333333,253,0.4216666666666667,94,0.26038781163434904,904,,,0.5165929203539823,17.0,,,,Pass,0.7783333333333333,1.0,Panel,1,1,0,1,0,1988.04,71569.44,4.257044967880086,153.25361884368309
46,Nov,3'25,2025,68320,Project,"Kawaii tracking W11, Kawaii tracking W11 (2), Radianz",Grocery,Air freshener,2080,962,0.4625,563,0.2706730769230769,1525,0.7331730769230769,990,0.47596153846153844,146,0.13176895306859207,5034,,,0.32327311371326983,20.666666666666668,,,,Pass,0.7340277777777778,1.0,Panel,1,1,0,1,0,6433.0,231588.0,4.218360655737705,151.86098360655737
47,Nov,3'25,2025,68341,Project,Nimbus,Healthcare,Adhesive bandages,496,327,0.6592741935483871,169,0.3407258064516129,496,1.0,0,0.0,2,0.0060790273556231,1199,,,0.4136780650542118,6.0,,,,Pass,1.0,1.0,Panel,1,1,0,1,0,1592.64,57335.04,3.2109677419354843,115.59483870967742
48,Dec,3'25,2025,68298,Project,A250,Research,Research,350,185,0.5285714285714286,157,0.44857142857142857,342,0.9771428571428571,65,0.18571428571428572,2,0.0106951871657754,903,7575.0,0.1192079207920792,0.3787375415282391,0.0,2025-11-26,2025-11-29,2025-12-02,Not Pass,0.977142857142857,7.0,Panel,1,1,0,1,0,761.88,27427.68,2.227719298245614,80.1978947368421
49,Dec,3'25,2025,68326,Project,Retina2,F&B,Canned fish,300,160,0.5333333333333333,24,0.08,184,0.6133333333333333,116,0.38666666666666666,0,0.0,1884,13240.0,0.1422960725075528,0.0976645435244161,0.0,,,,Pass,0.6133333333333332,1.0,Panel,1,1,0,1,0,0.0,0.0,0.0,0.0
50,Dec,3'25,2025,68345,Project,Bare beauty,Cosmmetics,Base Makeup,450,376,0.8355555555555556,83,0.18444444444444444,459,1.02,26,0.057777777777777775,16,0.04081632653061224,1100,12029.0,0.0914456729570205,0.4172727272727273,0.0,2025-12-08,2025-12-14,2025-12-12,Pass,1.02,5.0,Panel,1,1,0,1,0,2918.24,105056.63999999998,6.357821350762527,228.88156862745095
51,Dec,3'25,2025,68349,Project,Baby monster,Cosmmetics,Lipstick,160,173,1.08125,12,0.075,185,1.15625,11,0.06875,124,0.4175084175084175,836,12545.0,0.0666400956556396,0.2212918660287081,0.0,2025-12-09,2025-12-15,2025-12-16,Not Pass,1.15625,8.0,Panel,1,1,0,1,0,1217.52,43830.72,6.581189189189189,236.92281081081083
52,Dec,3'25,2025,68361,Project,CEP,Auto,Motorcycle,600,420,0.7,165,0.275,585,0.975,70,0.11666666666666667,27,0.06040268456375839,1190,10374.0,0.1147098515519568,0.4915966386554621,0.0,2025-11-28,2025-12-04,2025-12-04,Pass,0.975,7.0,Panel,1,1,0,1,0,1282.82,46181.52,2.1928547008547006,78.94276923076923
53,Dec,3'25,2025,68387,Project,Truffle,F&B,Soybean Oil,400,138,0.345,215,0.5375,353,0.8825,73,0.1825,0,0.0,1033,8350.0,0.1237125748502994,0.3417231364956437,0.0,,,,Pass,0.8825,1.0,Panel,1,1,0,1,0,0.0,0.0,0.0,0.0
54,Dec,3'25,2025,Incident Check,Incident Check,Dec2025 #1 Blue Sphere [Expense],Auto,Auto,200,200,1.0,0,0.0,200,1.0,0,0.0,0,0.0,200,,,1.0,0.0,2025-12-04,2025-12-05,2025-12-05,Pass,1.0,2.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
55,Dec,3'25,2025,Incident Check,Incident Check,Dec2025 #2 Blue Sphere [Expense],Auto,Auto,200,200,1.0,0,0.0,200,1.0,0,0.0,0,0.0,200,,,1.0,0.0,2025-12-05,2025-12-09,2025-12-09,Pass,1.0,5.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
56,Dec,3'25,2025,Incident Check,Incident Check,Dec2025 #3 Easy money [Expense],Financial,Financial,200,202,1.01,0,0.0,202,1.01,0,0.0,0,0.0,202,,,1.0,0.0,2025-12-16,2025-12-17,2025-12-17,Pass,1.01,2.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0
57,Dec,3'25,2025,Incident Check,Incident Check,Dec2025 #4 Easy money [Expense],Financial,Financial,200,258,1.29,0,0.0,258,1.29,0,0.0,0,0.0,258,,,1.0,0.0,2025-12-17,2025-12-18,2025-12-18,Pass,1.29,2.0,Panel,1,0,0,0,0,0.0,0.0,0.0,0.0`;

// --- Utility Functions ---
const parseCSV = (csv) => {
  const lines = csv.split('\n').filter(line => line.trim() !== '');
  const headers = lines[0].split(',').map(h => h.trim());
  const data = lines.slice(1).map(line => {
    // Handle commas inside quotes
    const values = [];
    let inQuotes = false;
    let value = '';
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') { inQuotes = !inQuotes; }
      else if (char === ',' && !inQuotes) { values.push(value.trim()); value = ''; }
      else { value += char; }
    }
    values.push(value.trim());

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    return row;
  });
  return data;
};

const processData = (rawData) => {
  const processed = [];
  const groups = {};

  rawData.forEach(row => {
    // Clean and Parse basic fields
    const year = row.year;
    const month = row.month;
    const projectType = row.project_type === 'Incident Check' ? 'Incident Check' : 'Client Project';
    const projectNo = row.project_no;
    
    // Convert numeric fields
    const quota = parseFloat(row.quota) || 0;
    const apComplete = parseFloat(row.ap_complete) || 0;
    const meowComplete = parseFloat(row.meow_complete) || 0;
    const fwComplete = parseFloat(row.fw_complete) || 0;
    const badSample = parseFloat(row.bad_sample) || 0;
    const answers = parseFloat(row.Answers) || 0;
    const apCost = parseFloat(row.ap_total_price_ap) || 0;
    const totalThb = parseFloat(row.total_thb) || 0;
    const ir = parseFloat(row.ir) || 0;
    const loi = parseFloat(row.loi) || 0;
    const mbokakr = parseFloat(row.MBOKAKR) || 0;
    const workingDay = parseFloat(row.working_day) || 0;
    
    // Panel Usage Flags
    const apMobile = parseFloat(row.ap_mobile) || 0;
    const ap3party = parseFloat(row.ap_3party) || 0;
    const apRabbit = parseFloat(row.ap_rabbit) || 0;
    const apPc = parseFloat(row.ap_pc) || 0;
    const cint = parseFloat(row.cint) || 0;

    const key = `${year}-${month}-${projectNo}`;

    // Logic: If Incident Check, add directly. If Client Project, aggregate.
    if (projectType === 'Incident Check') {
      processed.push({
        ...row,
        project_type_mapped: projectType,
        quota, apComplete, meowComplete, fwComplete, badSample, answers, apCost, totalThb, ir, loi, mbokakr, workingDay,
        totalComplete: apComplete + meowComplete,
        percentComplete: quota > 0 ? ((apComplete + meowComplete) / quota) * 100 : 0,
        apMobile, ap3party, apRabbit, apPc, cint
      });
    } else {
      if (!groups[key]) {
        groups[key] = {
          ...row,
          project_type_mapped: projectType,
          quota: 0, apComplete: 0, meowComplete: 0, fwComplete: 0, badSample: 0, answers: 0,
          apCost: 0, totalThb: 0,
          sumIR: 0, countIR: 0, // for avg
          sumLOI: 0, countLOI: 0, // for avg
          sumMBOKAKR: 0, countMBOKAKR: 0,
          sumWorkingDay: 0, countWorkingDay: 0,
          projectNames: [],
          apMobile: 0, ap3party: 0, apRabbit: 0, apPc: 0, cint: 0
        };
      }
      
      const g = groups[key];
      g.quota += quota;
      g.apComplete += apComplete;
      g.meowComplete += meowComplete;
      g.fwComplete += fwComplete;
      g.badSample += badSample;
      g.answers += answers;
      g.apCost += apCost;
      g.totalThb += totalThb;
      
      if (ir > 0) { g.sumIR += ir; g.countIR++; }
      if (loi > 0) { g.sumLOI += loi; g.countLOI++; }
      if (mbokakr > 0) { g.sumMBOKAKR += mbokakr; g.countMBOKAKR++; }
      if (workingDay > 0) { g.sumWorkingDay += workingDay; g.countWorkingDay++; }

      // Max flags (if any project in group used mobile, group used mobile)
      g.apMobile = Math.max(g.apMobile, apMobile);
      g.ap3party = Math.max(g.ap3party, ap3party);
      g.apRabbit = Math.max(g.apRabbit, apRabbit);
      g.apPc = Math.max(g.apPc, apPc);
      g.cint = Math.max(g.cint, cint);

      if (!g.projectNames.includes(row.project_name)) g.projectNames.push(row.project_name);
    }
  });

  // Finalize Groups
  Object.values(groups).forEach(g => {
    const totalComplete = g.apComplete + g.meowComplete;
    processed.push({
      ...g,
      project_name: g.projectNames.join(', '),
      ir: g.countIR ? g.sumIR / g.countIR : 0,
      loi: g.countLOI ? g.sumLOI / g.countLOI : 0,
      MBOKAKR: g.countMBOKAKR ? g.sumMBOKAKR / g.countMBOKAKR : 0,
      workingDay: g.countWorkingDay ? g.sumWorkingDay / g.countWorkingDay : 0,
      totalComplete,
      percentComplete: g.quota > 0 ? (totalComplete / g.quota) * 100 : 0,
      // Recalculate CPIs
      per_cpi_usd: totalComplete > 0 ? g.apCost / totalComplete : 0,
      per_cpi_thb: totalComplete > 0 ? g.totalThb / totalComplete : 0
    });
  });

  return processed;
};

const formatCurrency = (val, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(val);
};

const formatNumber = (val) => {
  return new Intl.NumberFormat('en-US').format(val);
};

// --- Components ---

const DropdownFilter = ({ label, options, selected, onChange }) => {
  return (
    <div className="flex flex-col min-w-[150px]">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
      <div className="relative">
        <select
          value={selected.length === 0 ? "" : (selected.length === 1 ? selected[0] : "multiple")}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "all") onChange([]);
            else if (val !== "multiple") onChange([val]);
          }}
          className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 transition-colors shadow-sm text-sm"
        >
          <option value="all">All {label}s</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, subValue, icon: Icon, color = "blue", size="normal" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start justify-between hover:shadow-md transition-shadow duration-200 h-full`}>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1 line-clamp-1" title={title}>{title}</p>
        <h3 className="text-xl font-bold text-gray-800 tracking-tight">{value}</h3>
        {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
      </div>
      <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};

const WordCloud = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.value), 1);
  const colors = ['#6366f1', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#3b82f6'];
  
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center h-full p-4 overflow-y-auto">
      {data.map((item, idx) => {
        const size = 0.8 + (item.value / maxVal) * 1.5; // Scale font size
        return (
          <span 
            key={idx} 
            style={{ 
              fontSize: `${size}rem`, 
              color: colors[idx % colors.length],
              opacity: 0.8 + (item.value / maxVal) * 0.2
            }}
            className="font-bold px-2 py-1 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors cursor-default"
            title={`${item.name}: ${item.value} Projects`}
          >
            {item.name}
          </span>
        )
      })}
    </div>
  )
}

const App = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    projectType: [],
    month: [],
    year: [],
    quater: []
  });
  const [displayCount, setDisplayCount] = useState(10);

  // Initialize Data
  useEffect(() => {
    const parsed = parseCSV(rawCsvData);
    const processed = processData(parsed);
    setData(processed);
    
    // Set initial filters
    const uniqueTypes = [...new Set(processed.map(d => d.project_type_mapped))];
    const uniqueMonths = [...new Set(processed.map(d => d.month))]; // Add sort logic if needed
    const uniqueYears = [...new Set(processed.map(d => d.year))];
    const uniqueQuaters = [...new Set(processed.map(d => d.quater))];

    setFilters({
      projectType: ['Client Project'], // Default to Client Project
      month: [], // Default empty means ALL
      year: [],
      quater: []
    });
  }, []);

  // Filter Data
  const filteredData = useMemo(() => {
    return data.filter(d => 
      (filters.projectType.length === 0 || filters.projectType.includes(d.project_type_mapped)) &&
      (filters.month.length === 0 || filters.month.includes(d.month)) &&
      (filters.year.length === 0 || filters.year.includes(String(d.year))) &&
      (filters.quater.length === 0 || filters.quater.includes(d.quater))
    );
  }, [data, filters]);

  // Calculations for Summary
  const stats = useMemo(() => {
    const totalProjects = filteredData.filter(d => d.project_type_mapped === 'Client Project').length;
    const apCost = filteredData.reduce((acc, curr) => acc + (curr.apCost || 0), 0);
    const thbCost = filteredData.reduce((acc, curr) => acc + (curr.totalThb || 0), 0);
    
    const validCpiUsd = filteredData.filter(d => d.per_cpi_usd > 0);
    const avgCpiUsd = validCpiUsd.length ? validCpiUsd.reduce((a, b) => a + b.per_cpi_usd, 0) / validCpiUsd.length : 0;
    
    const validCpiThb = filteredData.filter(d => d.per_cpi_thb > 0);
    const avgCpiThb = validCpiThb.length ? validCpiThb.reduce((a, b) => a + b.per_cpi_thb, 0) / validCpiThb.length : 0;

    const targetQuota = filteredData.reduce((acc, curr) => acc + curr.quota, 0);
    const allAnswers = filteredData.reduce((acc, curr) => acc + curr.answers, 0);
    const apComplete = filteredData.reduce((acc, curr) => acc + curr.apComplete, 0);
    const meowComplete = filteredData.reduce((acc, curr) => acc + curr.meowComplete, 0);
    const fwComplete = filteredData.reduce((acc, curr) => acc + curr.fwComplete, 0);
    const allComplete = apComplete + meowComplete + fwComplete;
    const badSample = filteredData.reduce((acc, curr) => acc + curr.badSample, 0);

    const validIr = filteredData.filter(d => d.ir > 0);
    const avgIr = validIr.length ? validIr.reduce((a, b) => a + b.ir, 0) / validIr.length : 0;

    const validLoi = filteredData.filter(d => d.loi > 0);
    const avgLoi = validLoi.length ? validLoi.reduce((a, b) => a + b.loi, 0) / validLoi.length : 0;

    const kpiPass = filteredData.filter(d => d.kpi_39 === 'Pass').length;
    const kpiRate = filteredData.length ? (kpiPass / filteredData.length) * 100 : 0;

    const mobileProjects = filteredData.filter(d => d.apMobile > 0).length;
    const mobileRate = filteredData.length ? (mobileProjects / filteredData.length) * 100 : 0;
    
    const thirdPartyProjects = filteredData.filter(d => (d.ap3party > 0 || d.apRabbit > 0 || d.apPc > 0 || d.cint > 0)).length;
    const thirdPartyRate = filteredData.length ? (thirdPartyProjects / filteredData.length) * 100 : 0;

    const validWorkingDay = filteredData.filter(d => d.workingDay > 0);
    const avgWorkingDay = validWorkingDay.length ? validWorkingDay.reduce((a, b) => a + b.workingDay, 0) / validWorkingDay.length : 0;

    const buckets = {
      less70: filteredData.filter(d => d.percentComplete < 70).length,
      bet70_90: filteredData.filter(d => d.percentComplete >= 70 && d.percentComplete <= 90).length,
      more90: filteredData.filter(d => d.percentComplete > 90 && d.percentComplete < 100).length,
      more100: filteredData.filter(d => d.percentComplete >= 100).length,
    };
    
    // MBOKAKR Logic: Pass if (AP+Meow)/Quota >= 1
    const mbokakrPassCount = filteredData.filter(d => {
        const totalComp = d.apComplete + d.meowComplete;
        return d.quota > 0 && (totalComp / d.quota) >= 1;
    }).length;

    // --- New Stats for the Breakdown Panel ---
    const avgPercentComplete = filteredData.length 
        ? filteredData.reduce((a, b) => a + b.percentComplete, 0) / filteredData.length 
        : 0;

    const catStats = {};
    filteredData.forEach(d => {
        if (!catStats[d.category]) catStats[d.category] = { sum: 0, count: 0 };
        catStats[d.category].sum += d.percentComplete;
        catStats[d.category].count += 1;
    });
    
    let bestCategory = { name: 'N/A', val: 0 };
    Object.keys(catStats).forEach(k => {
        const avg = catStats[k].sum / catStats[k].count;
        if (avg > bestCategory.val) bestCategory = { name: k, val: avg };
    });

    return { totalProjects, apCost, thbCost, avgCpiUsd, avgCpiThb, targetQuota, allAnswers, apComplete, meowComplete, fwComplete, allComplete, badSample, avgIr, avgLoi, kpiRate, buckets, mobileRate, thirdPartyRate, avgWorkingDay, mbokakrPassCount, avgPercentComplete, bestCategory };
  }, [filteredData]);

  // Chart Data Preparation
  const scatterData = filteredData.filter(d => d.ir > 0 && d.loi > 0).map(d => ({
    x: d.loi,
    y: d.ir * 100,
    z: d.totalComplete,
    name: d.project_name
  }));

  const categoryData = useMemo(() => {
      const cats = {};
      filteredData.forEach(d => {
          if(!cats[d.category]) cats[d.category] = 0;
          cats[d.category]++;
      });
      return Object.keys(cats).map(k => ({ name: k, value: cats[k] }));
  }, [filteredData]);

  // KPI Trend Data
  const kpiTrendData = useMemo(() => {
    const monthOrder = { 'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'June': 6, 'July': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12 };
    const monthlyStats = {};
    
    filteredData.forEach(d => {
      if (!monthlyStats[d.month]) monthlyStats[d.month] = { total: 0, pass: 0 };
      monthlyStats[d.month].total++;
      if (d.kpi_39 === 'Pass') monthlyStats[d.month].pass++;
    });

    return Object.keys(monthlyStats)
      .sort((a, b) => monthOrder[a] - monthOrder[b])
      .map(m => ({
        name: m,
        rate: (monthlyStats[m].pass / monthlyStats[m].total) * 100
      }));
  }, [filteredData]);

  // MBOKAKR Status Data
  const mbokakrStatusData = useMemo(() => {
      const pass = stats.mbokakrPassCount;
      const fail = filteredData.length - pass;
      return [
          { name: 'Achieved Target', value: pass, color: '#10B981' }, // Green
          { name: 'Missed Target', value: fail, color: '#F59E0B' } // Amber
      ]
  }, [stats.mbokakrPassCount, filteredData.length]);

  // Completion Rate Chart Data (Modified for Status Cards)
  const completionCardData = useMemo(() => {
      return [
          { name: 'Target Met', desc: '≥ 100% Complete', value: stats.buckets.more100, color: 'bg-green-50 text-green-700', border: 'border-green-200', icon: CheckCircle, iconColor: 'text-green-600' },
          { name: 'High', desc: '90-99% Complete', value: stats.buckets.more90, color: 'bg-teal-50 text-teal-700', border: 'border-teal-200', icon: TrendingUp, iconColor: 'text-teal-600' },
          { name: 'Medium', desc: '70-90% Complete', value: stats.buckets.bet70_90, color: 'bg-yellow-50 text-yellow-700', border: 'border-yellow-200', icon: AlertTriangle, iconColor: 'text-yellow-600' },
          { name: 'Low', desc: '< 70% Complete', value: stats.buckets.less70, color: 'bg-red-50 text-red-700', border: 'border-red-200', icon: XCircle, iconColor: 'text-red-600' },
      ];
  }, [stats.buckets]);

  // NEW: Monthly Volume Trends
  const monthlyTrendData = useMemo(() => {
    const monthOrder = { 'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'June': 6, 'July': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12 };
    const monthlyStats = {};

    filteredData.forEach(d => {
        if (!monthlyStats[d.month]) monthlyStats[d.month] = { client: 0, incident: 0, totalCompletes: 0 };
        if (d.project_type_mapped === 'Client Project') monthlyStats[d.month].client++;
        else monthlyStats[d.month].incident++;
        
        monthlyStats[d.month].totalCompletes += (d.totalComplete || 0);
    });

    return Object.keys(monthlyStats)
        .sort((a, b) => monthOrder[a] - monthOrder[b])
        .map(m => ({
            name: m,
            Client: monthlyStats[m].client,
            Incident: monthlyStats[m].incident,
            Completes: monthlyStats[m].totalCompletes
        }));
  }, [filteredData]);

  // Insight for Monthly Chart
  const monthlyInsight = useMemo(() => {
      if (monthlyTrendData.length === 0) return { busiestMonth: '-', avgProjects: 0 };
      const busiest = monthlyTrendData.reduce((prev, current) => (prev.Client + prev.Incident) > (current.Client + current.Incident) ? prev : current);
      const totalP = monthlyTrendData.reduce((acc, curr) => acc + curr.Client + curr.Incident, 0);
      return {
          busiestMonth: busiest.name,
          avgProjects: (totalP / monthlyTrendData.length).toFixed(1)
      };
  }, [monthlyTrendData]);


  // Options for filters
  const filterOptions = {
    projectType: ['Client Project', 'Incident Check'],
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    year: ['2024', '2025'],
    quater: ["4'24", "1'25", "2'25", "3'25"]
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 p-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight">Panel Report Dashboard 2025</h1>
          <p className="text-gray-500 mt-1">Interactive Insights & Performance Overview</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm text-gray-500 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Data Updated: 2025-Rev3
        </div>
      </div>

      {/* Filter Section (Dropdowns) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-2 mb-4 text-indigo-700 font-semibold text-lg">
          <Filter className="w-5 h-5" /> Filter Data
        </div>
        <div className="flex flex-wrap gap-6">
          <DropdownFilter label="Project Type" options={filterOptions.projectType} selected={filters.projectType} onChange={(val) => setFilters({...filters, projectType: val})} />
          <DropdownFilter label="Year" options={filterOptions.year} selected={filters.year} onChange={(val) => setFilters({...filters, year: val})} />
          <DropdownFilter label="Quarter" options={filterOptions.quater} selected={filters.quater} onChange={(val) => setFilters({...filters, quater: val})} />
          <DropdownFilter label="Month" options={filterOptions.month} selected={filters.month} onChange={(val) => setFilters({...filters, month: val})} />
        </div>
      </div>

      {/* Summary Totals (3 Rows x 5 Columns) */}
      <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2"><LayoutDashboard className="w-5 h-5"/> Executive Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
             {/* Row 1 */}
            <SummaryCard title="Total Projects" value={stats.totalProjects} icon={Layers} color="indigo" />
            <SummaryCard title="Target Quota" value={formatNumber(stats.targetQuota)} icon={Target} color="purple" />
            <SummaryCard title="All Answers" value={formatNumber(stats.allAnswers)} subValue="(RD)" icon={Users} color="purple" />
            <SummaryCard title="Avg. IR" value={`${(stats.avgIr * 100).toFixed(2)}%`} icon={Activity} color="orange" />
            <SummaryCard title="Avg. LOI" value={`${stats.avgLoi.toFixed(1)} min`} icon={Clock} color="orange" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
             {/* Row 2 */}
            <SummaryCard title="All Completes" value={formatNumber(stats.allComplete)} subValue="AP + Meow + FW" icon={CheckCircle} color="indigo" />
            <SummaryCard title="AP Completes" value={formatNumber(stats.apComplete)} icon={Users} color="indigo" />
            <SummaryCard title="Meow Completes" value={formatNumber(stats.meowComplete)} icon={Users} color="indigo" />
            <SummaryCard title="FW (CLT) Completes" value={formatNumber(stats.fwComplete)} icon={Users} color="blue" />
            <SummaryCard title="Total Bad Sample" value={formatNumber(stats.badSample)} icon={AlertTriangle} color="red" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
             {/* Row 3 */}
            <SummaryCard title="Total Cost (USD)" value={formatCurrency(stats.apCost)} icon={DollarSign} color="green" />
            <SummaryCard title="Total Cost (THB)" value={formatNumber(stats.thbCost)} subValue="THB" icon={DollarSign} color="green" />
            <SummaryCard title="Avg. CPI (USD)" value={formatCurrency(stats.avgCpiUsd)} icon={TrendingUp} color="blue" />
            <SummaryCard title="Avg. CPI (THB)" value={formatNumber(stats.avgCpiThb.toFixed(2))} subValue="THB" icon={TrendingUp} color="blue" />
            <SummaryCard title="KPI Pass Rate" value={`${stats.kpiRate.toFixed(1)}%`} icon={CheckCircle} color={stats.kpiRate > 90 ? "green" : "red"} />
          </div>
      </div>

      {/* Mobile & Panel Insights + Avg Working Days */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2"><Smartphone className="w-5 h-5"/> Mobile & Panel Insights</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4 lg:col-span-1">
               <div className="bg-blue-50 p-6 rounded-lg flex items-center justify-between shadow-sm">
                   <div>
                       <p className="text-sm text-gray-500 uppercase font-bold mb-1">Mobile Panel Usage</p>
                       <p className="text-3xl font-bold text-blue-600">{stats.mobileRate.toFixed(1)}%</p>
                   </div>
                   <Smartphone className="w-10 h-10 text-blue-200" />
               </div>
               <div className="bg-purple-50 p-6 rounded-lg flex items-center justify-between shadow-sm">
                   <div>
                       <p className="text-sm text-gray-500 uppercase font-bold mb-1">3rd Party Usage</p>
                       <p className="text-3xl font-bold text-purple-600">{stats.thirdPartyRate.toFixed(1)}%</p>
                   </div>
                   <Users className="w-10 h-10 text-purple-200" />
               </div>
               {/* Moved Avg Working Days Here */}
               <div className="bg-orange-50 p-6 rounded-lg flex items-center justify-between shadow-sm">
                   <div>
                       <p className="text-sm text-gray-500 uppercase font-bold mb-1">Avg. Working Days</p>
                       <p className="text-3xl font-bold text-orange-600">{stats.avgWorkingDay.toFixed(1)}</p>
                       <p className="text-xs text-orange-400 font-medium">Days per project</p>
                   </div>
                   <Calendar className="w-10 h-10 text-orange-200" />
               </div>
            </div>

            {/* Breakdown Split Layout - Status Grid Cards */}
            <div className="lg:col-span-3 bg-gray-50 rounded-lg p-6 border border-gray-200 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-600 mb-6 flex items-center gap-2"><Target className="w-4 h-4"/> Completion Rate Breakdown</h3>
                    
                    {/* Status Card Grid - Replaced Pie Chart */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {completionCardData.map((item, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border ${item.border} ${item.color} shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-lg">{item.name}</p>
                                        <p className="text-xs opacity-80">{item.desc}</p>
                                    </div>
                                    <div className="p-2 bg-white rounded-full bg-opacity-50">
                                        <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold">{item.value}</span>
                                    <span className="text-sm opacity-80">Projects ({((item.value / filteredData.length) * 100).toFixed(0)}%)</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Insights Column */}
                <div className="md:w-1/3 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8 space-y-6">
                    <div>
                        <p className="text-sm text-gray-500 font-medium mb-1 flex items-center gap-1"><Zap className="w-3 h-3"/> Overall Avg. Completion</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-indigo-600">{stats.avgPercentComplete.toFixed(1)}%</span>
                            <span className="text-xs text-gray-400">across all projects</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium mb-2 flex items-center gap-1"><Award className="w-3 h-3"/> Best Performing Category</p>
                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-md font-bold text-gray-700">{stats.bestCategory.name}</span>
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                                    {stats.bestCategory.val.toFixed(0)}% Avg
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${Math.min(stats.bestCategory.val, 100)}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Scatter Chart - Expanded Height */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2"><BarChart2 className="w-5 h-5"/> Performance Analysis</h2>
             </div>
             <div className="h-80">
                <h3 className="text-sm font-semibold text-gray-500 mb-2 text-center">IR% vs LOI (Size = Completes)</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="x" name="LOI" unit=" min" />
                        <YAxis type="number" dataKey="y" name="IR" unit="%" />
                        <ZAxis type="number" dataKey="z" range={[50, 400]} name="Completes" />
                        <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        <Scatter name="Projects" data={scatterData} fill="#6366f1" />
                    </ScatterChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Word Cloud for Categories */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2"><Layers className="w-5 h-5"/> Top Categories</h2>
             </div>
             <div className="h-80 border-2 border-dashed border-gray-100 rounded-lg flex items-center justify-center">
                <WordCloud data={categoryData} />
             </div>
          </div>
      </div>

      {/* KPI & MBOKAKR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
           {/* KPI Trend Line Chart */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5"/> KPI Pass Rate Trend (Monthly)</h2>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={kpiTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} unit="%" />
                            <RechartsTooltip />
                            <Legend />
                            <Line type="monotone" dataKey="rate" name="Pass Rate %" stroke="#10B981" strokeWidth={3} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
           </div>

           {/* MBOKAKR Status Overview (Redesigned) */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-700 mb-2 flex items-center gap-2"><Award className="w-5 h-5"/> MBOKAKR Target Achievement</h2>
                <p className="text-xs text-gray-500 mb-6">Target: (AP + Meow Completes) ≥ 100% of Quota</p>
                
                <div className="flex flex-col md:flex-row items-center justify-around h-72">
                    {/* Donut Chart */}
                    <div className="h-64 w-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={mbokakrStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {mbokakrStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Stats Summary */}
                    <div className="flex flex-col gap-4 p-4">
                        <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-center min-w-[140px]">
                            <span className="block text-3xl font-bold text-green-600">{stats.mbokakrPassCount}</span>
                            <span className="text-xs font-semibold text-green-700 uppercase">Projects Passed</span>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-center min-w-[140px]">
                            <span className="block text-3xl font-bold text-yellow-600">{filteredData.length - stats.mbokakrPassCount}</span>
                            <span className="text-xs font-semibold text-yellow-700 uppercase">Projects Missed</span>
                        </div>
                    </div>
                </div>
           </div>
      </div>

      {/* NEW: Monthly Volume & Trends */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2"><BarChart2 className="w-5 h-5"/> Monthly Volume & Trends</h2>
              <div className="flex gap-4">
                  <div className="text-right">
                      <p className="text-xs text-gray-500 font-bold uppercase">Busiest Month</p>
                      <p className="text-lg font-bold text-indigo-600">{monthlyInsight.busiestMonth}</p>
                  </div>
                  <div className="text-right">
                      <p className="text-xs text-gray-500 font-bold uppercase">Avg. Projects/Month</p>
                      <p className="text-lg font-bold text-purple-600">{monthlyInsight.avgProjects}</p>
                  </div>
              </div>
          </div>
          <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyTrendData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <RechartsTooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="Client" name="Client Projects" stackId="a" fill="#8884d8" />
                      <Bar yAxisId="left" dataKey="Incident" name="Incident Checks" stackId="a" fill="#ffc658" />
                      <Line yAxisId="right" type="monotone" dataKey="Completes" name="Total Completes" stroke="#82ca9d" strokeWidth={3} />
                  </ComposedChart>
              </ResponsiveContainer>
          </div>
      </div>

      {/* Data Table (Same as before) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
             <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2"><FileText className="w-5 h-5"/> Project Details</h2>
             <span className="text-sm text-gray-500">Showing {Math.min(displayCount, filteredData.length)} of {filteredData.length} Projects</span>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                          <th className="p-4 font-semibold">Month</th>
                          <th className="p-4 font-semibold">Project No</th>
                          <th className="p-4 font-semibold w-1/4">Project Name</th>
                          <th className="p-4 font-semibold">Type</th>
                          <th className="p-4 font-semibold text-right">Quota</th>
                          <th className="p-4 font-semibold text-right">Completes</th>
                          <th className="p-4 font-semibold text-right">%</th>
                          <th className="p-4 font-semibold text-right">Total Cost (THB)</th>
                          <th className="p-4 font-semibold text-center">Status</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {filteredData.slice(0, displayCount).map((row, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors">
                              <td className="p-4 text-sm text-gray-600">{row.month}</td>
                              <td className="p-4 text-sm font-medium text-indigo-600">{row.project_no}</td>
                              <td className="p-4 text-sm text-gray-800 truncate max-w-xs" title={row.project_name}>{row.project_name}</td>
                              <td className="p-4 text-sm text-gray-500">
                                  <span className={`px-2 py-1 rounded-full text-xs ${row.project_type_mapped === 'Incident Check' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                      {row.project_type_mapped === 'Incident Check' ? 'Incident' : 'Client'}
                                  </span>
                              </td>
                              <td className="p-4 text-sm text-gray-600 text-right">{formatNumber(row.quota)}</td>
                              <td className="p-4 text-sm text-gray-600 text-right font-medium">{formatNumber(row.totalComplete)}</td>
                              <td className="p-4 text-sm text-right">
                                  <span className={`font-bold ${row.percentComplete >= 100 ? 'text-green-600' : row.percentComplete < 70 ? 'text-red-500' : 'text-yellow-600'}`}>
                                      {row.percentComplete.toFixed(1)}%
                                  </span>
                              </td>
                              <td className="p-4 text-sm text-gray-600 text-right">{formatNumber(row.totalThb)}</td>
                              <td className="p-4 text-center">
                                  {row.kpi_39 === 'Pass' ? (
                                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                                  ) : (
                                      <AlertTriangle className="w-5 h-5 text-red-400 mx-auto" />
                                  )}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          {displayCount < filteredData.length && (
              <div className="p-4 text-center border-t border-gray-100">
                  <button 
                    onClick={() => setDisplayCount(prev => prev + 10)}
                    className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                  >
                      Load More Projects <ChevronDown className="w-4 h-4 inline ml-1"/>
                  </button>
              </div>
          )}
      </div>

    </div>
  );
};

export default App;