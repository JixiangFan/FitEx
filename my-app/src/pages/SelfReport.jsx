import React from "react";
import { Button, Header } from "../components";
import writeSelfReortData from "../components/Firebase/writeSelfReportData";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";

var database_weight = 0;
var uid = "";
var u_name = "";

const Metabolic_equivalent_table = {
  1: {
    "bicycling, mountain, uphill, vigorous": 14.0,
    "bicycling, mountain, competitive, racing": 16.0,
    "bicycling, BMX": 8.5,
    "bicycling, mountain, general": 8.5,
    "bicycling, <10 mph, leisure, to work or for pleasure": 4.0,
    "bicycling, to/from work, self selected pace": 6.8,
    "bicycling, on dirt or farm road, moderate pace": 5.8,
    "bicycling, general": 7.5,
    "bicycling, leisure, 5.5 mph": 3.5,
    "bicycling, leisure, 9.4 mph": 5.8,
    "bicycling, 10-11.9 mph, leisure, slow, light effort": 6.8,
    "bicycling, 12-13.9 mph, leisure, moderate effort": 8.0,
    "bicycling, 14-15.9 mph, racing or leisure, fast, vigorous effort": 10.0,
    "bicycling, 16-19 mph, racing/not drafting or > 19 mph drafting, very fast, racing general": 12.0,
    "bicycling, > 20 mph, racing, not drafting": 15.8,
    "bicycling, 12 mph, seated, hands on brake hoods or bar drops, 80 rpm": 8.5,
    "bicycling, 12 mph, standing, hands on brake hoods, 60 rpm": 9.0,
    unicycling: 5.0,
  },
  2: {
    "activity promoting video game (e.g., Wii Fit), light effort (e.g., balance, yoga)": 2.3,
    "activity promoting video game (e.g., Wii Fit), moderate effort (e.g., aerobic, resistance)": 3.8,
    "activity promoting video/arcade game (e.g., Exergaming, Dance Dance Revolution), vigorous effort": 7.2,
    "army type obstacle course exercise, boot camp training program": 5.0,
    "bicycling, stationary, general": 7.0,
    "bicycling, stationary, 30-50 watts, very light to light effort": 3.5,
    "bicycling, stationary, 90-100 watts, moderate to vigorous effort": 6.8,
    "bicycling, stationary, 101-160 watts, vigorous effort": 8.8,
    "bicycling, stationary, 161-200 watts, vigorous effort": 11.0,
    "bicycling, stationary, 201-270 watts, very vigorous effort": 14.0,
    "bicycling, stationary, 51-89 watts, light-to-moderate effort": 4.8,
    "bicycling, stationary, RPM/Spin bike class": 8.5,
    "calisthenics (e.g., push ups, sit ups, pull-ups, jumping jacks), vigorous effort": 8.0,
    "calisthenics (e.g., push ups, sit ups, pull-ups, lunges), moderate effort": 3.8,
    "calisthenics (e.g., situps, abdominal crunches), light effort": 2.8,
    "calisthenics, light or moderate effort, general (e.g., back exercises), going up &amp; down from floor ( 150)": 3.5,
    "circuit training, moderate effort": 4.3,
    "circuit training, including kettlebells, some aerobic movement with minimal rest, general, vigorous intensity": 8.0,
    "CurvesTM exercise routines in women": 3.5,
    "Elliptical trainer, moderate effort": 5.0,
    "resistance training (weight lifting, free weight, nautilus or universal), power lifting or body building, vigorous effort": 6.0,
    "resistance (weight) training, squats , slow or explosive effort": 5.0,
    "resistance (weight) training, multiple exercises, 8-15 repetitions at varied resistance": 3.5,
    "health club exercise, general": 5.5,
    "health club exercise classes, general, gym/weight training combined in one visit": 5.0,
    "health club exercise, conditioning classes": 7.8,
    "home exercise, general": 3.8,
    "stair-treadmill ergometer, general": 9.0,
    "rope skipping, general": 12.3,
    "rowing, stationary ergometer, general, vigorous effort": 6.0,
    "rowing, stationary, general, moderate effort": 4.8,
    "rowing, stationary, 100 watts, moderate effort": 7.0,
    "rowing, stationary, 150 watts, vigorous effort": 8.5,
    "rowing, stationary, 200 watts, very vigorous effort": 12.0,
    "ski machine, general": 6.8,
    "slide board exercise, general": 11.0,
    "slimnastics, jazzercise": 6.0,
    "stretching, mild": 2.3,
    "pilates, general": 3.0,
    "teaching exercise class (e.g., aerobic, water)": 6.8,
    "therapeutic exercise ball, Fitball exercise": 2.8,
    "upper body exercise, arm ergometer": 2.8,
    "upper body exercise, stationary bicycle - Airdyne (arms only) 40 rpm, moderate": 4.3,
    "water aerobics, water calisthenics, water exercise": 5.3,
    "whirlpool, sitting": 1.3,
    "video exercise workouts, TV conditioning programs (e.g., yoga, stretching), light effort": 2.3,
    "video exercise workouts, TV conditioning programs (e.g., cardio-resistance), moderate effort": 4.0,
    "video exercise workouts, TV conditioning programs (e.g., cardio-resistance), vigorous effort": 6.0,
    "yoga, Hatha": 2.5,
    "yoga, Power": 4.0,
    "yoga, Nadisodhana": 2.0,
    "yoga, Surya Namaskar": 3.3,
    "native New Zealander physical activities (e.g., Haka Powhiri, Moteatea, Waita Tira, Whakawatea, etc.), general, moderate effort": 5.3,
    "native New Zealander physical activities (e.g., Haka, Taiahab), general, vigorous effort": 6.8,
  },
  3: {
    "ballet, modern, or jazz, general, rehearsal or class": 5.0,
    "ballet, modern, or jazz, performance, vigorous effort": 6.8,
    tap: 4.8,
    "aerobic, general": 7.3,
    "aerobic, step, with 6 - 8 inch step": 7.5,
    "aerobic, step, with 10 - 12 inch step": 9.5,
    "aerobic, step, with 4-inch step": 5.5,
    "bench step class, general": 8.5,
    "aerobic, low impact": 5.0,
    "aerobic, high impact": 7.3,
    "aerobic dance wearing 10-15 lb weights": 10.0,
    "ethnic or cultural dancing (e.g., Greek, Middle Eastern, hula, salsa, merengue, bamba y plena, flamenco, belly, and swing)": 4.5,
    "ballroom, fast": 5.5,
    "general dancing (e.g., disco, folk, Irish step dancing, line dancing, polka, contra, country)": 7.8,
    "ballroom dancing, competitive, general": 11.3,
    "ballroom, slow (e.g., waltz, foxtrot, slow dancing, samba, tango, 19th century dance, mambo, cha cha)": 3.0,
    "Anishinaabe Jingle Dancing": 5.5,
    "Caribbean dance (Abakua, Beguine, Bellair, Bongo, Brukin's, Caribbean Quadrills, Dinki Mini, Gere, Gumbay, Ibo, Jonkonnu, Kumina, Oreisha, Jambu)": 3.5,
  },
  4: {
    "fishing, general": 3.5,
    "fishing, crab fishing": 4.5,
    "fishing, catching fish with hands": 4.0,
    "fishing related, digging worms, with shovel": 4.3,
    "fishing from river bank and walking": 4.0,
    "fishing from boat or canoe, sitting": 2.0,
    "fishing from river bank, standing": 3.5,
    "fishing in stream, in waders": 6.0,
    "fishing, ice, sitting": 2.0,
    "fishing, jog or line, standing, general": 1.8,
    "fishing, dip net, setting net and retrieving fish, general": 3.5,
    "fishing, set net, setting net and retrieving fish, general": 3.8,
    "fishing, fishing wheel, setting net and retrieving fish, general": 3.0,
    "fishing with a spear, standing": 2.3,
    "hunting, bow and arrow, or crossbow": 2.5,
    "hunting, deer, elk, large game": 6.0,
    "hunting large game, dragging carcass": 11.3,
    "hunting large marine animals": 4.0,
    "hunting large game, from a hunting stand, limited walking": 2.5,
    "hunting large game from a car, plane, or boat": 2.0,
    "hunting, duck, wading": 2.5,
    "hunting, flying fox, squirrel": 3.0,
    "hunting, general": 5.0,
    "hunting, pheasants or grouse": 6.0,
    "hunting, birds": 3.3,
    "hunting, rabbit, squirrel, prairie chick, raccoon, small game": 5.0,
    "hunting, pigs, wild": 3.3,
    "trapping game, general": 2.0,
    "hunting, hiking with hunting gear": 9.5,
    "pistol shooting or trap shooting, standing": 2.5,
    "rifle exercises, shooting, lying down": 2.3,
    "rifle exercises, shooting, kneeling or standing": 2.5,
  },
  5: {
    "cleaning, sweeping carpet or floors, general": 3.3,
    "cleaning, sweeping, slow, light effort": 2.3,
    "cleaning, sweeping, slow, moderateeffort": 3.8,
    "cleaning, heavy or major (e.g. wash car, wash windows, clean garage), moderate effort": 3.5,
    "cleaning, mopping, standing, moderate effort": 3.5,
    "cleaning windows, washing windows, general": 3.2,
    "mopping, standing, light effort": 2.5,
    "polishing floors, standing, walking slowly, using electric polishing machine": 4.5,
    "multiple household tasks all at once, light effort": 2.8,
    "multiple household tasks all at once, moderate effort": 3.5,
    "multiple household tasks all at once, vigorous effort": 4.3,
    "cleaning, house or cabin, general, moderate effort": 3.3,
    "dusting or polishing furniture, general": 2.3,
    "kitchen activity, general, (e.g., cooking, washing dishes, cleaning up), moderate effort": 3.3,
    "cleaning, general (straightening up, changing linen, carrying out trash, light effort": 2.5,
    "wash dishes, standing or in general (not broken into stand/walk components)": 1.8,
    "wash dishes, clearing dishes from table, walking, light effort": 2.5,
    "vacuuming, general, moderate effort": 3.3,
    "butchering animals, small": 3.0,
    "butchering animal, large, vigorous effort": 6.0,
    "cutting and smoking fish, drying fish or meat": 2.3,
    "tanning hides, general": 4.0,
    "cooking or food preparation, moderate effort": 3.5,
    "cooking or food preparation - standing or sitting or in general (not broken into stand/walk components), manual appliances, light effort": 2.0,
    "serving food, setting table, implied walking or standing": 2.5,
    "cooking or food preparation, walking": 2.5,
    "feeding household animals": 2.5,
    "putting away groceries (e.g. carrying groceries, shopping without a grocery cart), carrying packages": 2.5,
    "carrying groceries upstairs": 7.5,
    "cooking Indian bread on an outside stove": 3.0,
    "food shopping with or without a grocery cart, standing or walking": 2.3,
    "non-food shopping, with or without a cart, standing or walking": 2.3,
    ironing: 1.8,
    "knitting, sewing, light effort, wrapping presents, sitting": 1.3,
    "sewing with a machine": 2.8,
    "laundry, fold or hang clothes, put clothes in washer or dryer, packing suitcase, washing clothes by hand, implied standing, light effort": 2.0,
    "laundry, hanging wash, washing clothes by hand, moderate effort": 4.0,
    "laundry, putting away clothes, gathering clothes to pack, putting away laundry, implied walking": 2.3,
    "making bed, changing linens": 3.3,
    "maple syruping/sugar bushing (including carrying buckets, carrying wood)": 5.0,
    "moving furniture, household items, carrying boxes": 5.8,
    "moving, lifting light loads": 5.0,
    "organizing room": 4.8,
    "scrubbing floors, on hands and knees, scrubbing bathroom, bathtub, moderate effort": 3.5,
    "scrubbing floors, on hands and knees, scrubbing bathroom, bathtub, light effort": 2.0,
    "scrubbing floors, on hands and knees, scrubbing bathroom, bathtub, vigorous effort": 6.5,
    "sweeping garage, sidewalk or outside of house": 4.0,
    "standing, packing/unpacking boxes, occasional lifting of lightweight household items, loading or unloading items in car, moderate effort": 3.5,
    "implied walking, putting away household items, moderate effort": 3.0,
    "watering plants": 2.5,
    "building a fire inside": 2.5,
    "moving household items upstairs, carrying boxes or furniture": 9.0,
    "standing, light effort tasks (pump gas, change light bulb, etc.)": 2.0,
    "walking, moderate effort tasks, non-cleaning (readying to leave, shut/lock doors, close windows, etc.)": 3.5,
    "sitting, playing with child(ren), light effort, only active periods": 2.2,
    "standing, playing with child(ren) light effort, only active periods": 2.8,
    "walking/running, playing with child(ren), moderate effort, only active periods": 3.5,
    "walking/running, playing with child(ren), vigorous effort, only active periods": 5.8,
    "walking and carrying small child, child weighing 15 lbs or more": 3.0,
    "walking and carrying small child, child weighing less than 15 lbs": 2.3,
    "standing, holding child": 2.0,
    "child care, infant, general": 2.5,
    "child care, sitting/kneeling (e.g., dressing, bathing, grooming, feeding, occasional lifting of child), light effort, general": 2.0,
    "child care, standing (e.g., dressing, bathing, grooming, feeding, occasional lifting of child), moderate effort": 3.0,
    "reclining with baby": 1.5,
    "breastfeeding, sitting or reclining": 2.0,
    "sit, playing with animals, light effort, only active periods": 2.5,
    "stand, playing with animals, light effort, only active periods": 2.8,
    "walk/run, playing with animals, general, light effort, only active periods": 3.0,
    "walk/run, playing with animals, moderate effort, only active periods": 4.0,
    "walk/run, playing with animals, vigorous effort, only active periods": 5.0,
    "standing, bathing dog": 3.5,
    "animal care, household animals, general": 2.3,
    "elder care, disabled adult, bathing, dressing, moving into and out of bed, only active periods": 4.0,
    "elder care, disabled adult, feeding, combing hair, light effort, only active periods": 2.3,
  },
  6: {
    "airplane repair": 3.0,
    "automobile body work": 4.0,
    "automobile repair, light or moderate effort": 3.3,
    "carpentry, general, workshop": 3.0,
    "carpentry, outside house, installing rain gutters,carpentry, outside house, building a fence": 6.0,
    "carpentry, outside house, building a fence": 3.8,
    "carpentry, finishing or refinishing cabinets or furniture": 3.3,
    "carpentry, sawing hardwood": 6.0,
    "carpentry, home remodeling tasks, moderate effort": 4.0,
    "carpentry, home remodeling tasks, light effort": 2.3,
    "caulking, chinking log cabin": 5.0,
    "caulking, except log cabin": 4.5,
    "cleaning gutters": 5.0,
    "excavating garage": 5.0,
    "hanging storm windows": 5.0,
    "hanging sheet rock inside house": 5.0,
    "hammering nails": 3.0,
    "home repair, general, light effort": 2.5,
    "home repair, general, moderate effort": 4.5,
    "home repair, general, vigorous effort": 6.0,
    "laying or removing carpet": 4.5,
    "laying tile or linoleum,repairing appliances": 3.8,
    "repairing appliances": 3.0,
    "painting, outside home": 5.0,
    "painting inside house,wallpapering, scraping paint": 3.3,
    painting: 4.5,
    "plumbing, general": 3.0,
    "put on and removal of tarp - sailboat": 3.0,
    roofing: 6.0,
    "sanding floors with a power sander": 4.5,
    "scraping and painting sailboat or powerboat": 4.5,
    "sharpening tools": 2.0,
    "spreading dirt with a shovel": 5.0,
    "washing and waxing hull of sailboat or airplane": 4.5,
    "washing and waxing car": 2.0,
    "washing fence, painting fence, moderate effort": 4.5,
    "wiring, tapping-splicing": 3.3,
  },
  7: {
    "lying quietly and watching television": 1.0,
    "lying quietly, doing nothing, lying in bed awake, listening to music (not talking or reading)": 1.3,
    "sitting quietly and watching television": 1.3,
    "sitting quietly, general": 1.3,
    "sitting quietly, fidgeting, general, fidgeting hands": 1.5,
    "sitting, fidgeting feet": 1.8,
    "sitting, smoking": 1.3,
    "sitting, listening to music (not talking or reading) or watching a movie in a theater": 1.5,
    "sitting at a desk, resting head in hands": 1.3,
    sleeping: 0.95,
    "standing quietly, standing in a line": 1.3,
    "standing, fidgeting": 1.8,
    "reclining, writing": 1.3,
    "reclining, talking or talking on phone": 1.3,
    "reclining, reading": 1.3,
    meditating: 1.0,
  },
  8: {
    "carrying, loading or stacking wood, loading/unloading or carrying lumber, light-to-moderate effort": 3.3,
    "carrying, loading or stacking wood, loading/unloading or carrying lumber": 5.5,
    "chopping wood, splitting logs, moderate effort": 4.5,
    "chopping wood, splitting logs, vigorous effort": 6.3,
    "clearing light brush, thinning garden, moderate effort": 3.5,
    "clearing brush/land, undergrowth, or ground, hauling branches, wheelbarrow chores, vigorous effort": 6.3,
    "digging sandbox, shoveling sand": 5.0,
    "digging, spading, filling garden, composting, light-to-moderate effort": 3.5,
    "digging, spading, filling garden, compositing": 5.0,
    "digging, spading, filling garden, composting, vigorous effort": 7.8,
    "driving tractor": 2.8,
    "felling trees, large size": 8.3,
    "felling trees, small-medium size": 5.3,
    "gardening with heavy power tools, tilling a garden, chain saw": 5.8,
    "gardening, using containers, older adults > 60 years": 2.3,
    "irrigation channels, opening and closing ports": 4.0,
    "laying crushed rock": 6.3,
    "laying sod": 5.0,
    "mowing lawn, general": 5.5,
    "mowing lawn, riding mower": 2.5,
    "mowing lawn, walk, hand mower": 6.0,
    "mowing lawn, walk, power mower, moderate or vigorous effort": 5.0,
    "mowing lawn, power mower, light or moderate effort": 4.5,
    "operating snow blower, walking": 2.5,
    "planting, potting, transplanting seedlings or plants, light effort": 2.0,
    "planting seedlings, shrub, stooping, moderate effort": 4.3,
    "planting crops or garden, stooping, moderate effort": 4.3,
    "planting trees": 4.5,
    "raking lawn or leaves, moderate effort": 3.8,
    "raking lawn": 4.0,
    "raking roof with snow rake": 4.0,
    "riding snow blower": 3.0,
    "sacking grass, leaves": 4.0,
    "shoveling dirt or mud": 5.5,
    "shoveling snow, by hand, moderate effort": 5.3,
    "shoveling snow, by hand": 6.0,
    "shoveling snow, by hand, vigorous effort": 7.5,
    "trimming shrubs or trees, manual cutter": 4.0,
    "trimming shrubs or trees, power cutter, using leaf blower, edge, moderate effort": 3.5,
    "walking, applying fertilizer or seeding a lawn, push applicator": 3.0,
    "watering lawn or garden, standing or walking": 1.5,
    "weeding, cultivating garden, light-to-moderate effort": 3.5,
    "weeding, cultivating garden": 4.5,
    "weeding, cultivating garden, using a hoe, moderate-to-vigorous effort": 5.0,
    "gardening, general, moderate effort": 3.8,
    "picking fruit off trees, picking fruits/vegetables, moderate effort": 3.5,
    "picking fruit off trees, gleaning fruits, picking fruits/vegetables, climbing ladder to pick fruit, vigorous effort": 4.5,
    "implied walking/standing - picking up yard, light, picking flowers or vegetables": 3.3,
    "walking, gathering gardening tools": 3.0,
    "wheelbarrow, pushing garden cart or wheelbarrow": 5.5,
    "yard work, general, light effort": 3.0,
    "yard work, general, moderate effort": 4.0,
    "yard work, general, vigorous effort": 6.0,
  },
  9: {
    "board game playing, sitting": 1.5,
    "casino gambling, standing": 2.5,
    "card playing,sitting": 1.5,
    "chess game, sitting": 1.5,
    "copying documents, standing": 1.5,
    "drawing, writing, painting, standing": 1.8,
    "laughing, sitting": 1.0,
    "sitting, reading, book, newspaper, etc.": 1.3,
    "sitting, writing, desk work, typing": 1.3,
    "sitting, playing traditional video game, computer game": 1.0,
    "standing, talking in person, on the phone, computer, or text messaging, light effort": 1.8,
    "sitting, talking in person, on the phone, computer, or text messaging, light effort": 1.5,
    "sitting, studying, general, including reading and/or writing, light effort": 1.3,
    "sitting, in class, general, including note-taking or class discussion": 1.8,
    "standing, reading": 1.8,
    "standing, miscellaneous": 2.5,
    "sitting, arts and crafts, carving wood, weaving, spinning wool, light effort": 1.8,
    "sitting, arts and crafts, carving wood, weaving, spinning wool, moderate effort": 3.0,
    "standing, arts and crafts, sand painting, carving, weaving, light effort": 2.5,
    "standing, arts and crafts, sand painting, carving, weaving, moderate effort": 3.3,
    "standing, arts and crafts, sand painting, carving, weaving, vigorous effort": 3.5,
    "retreat/family reunion activities involving sitting, relaxing, talking, eating": 1.8,
    "retreat/family reunion activities involving playing games with children": 3.0,
    "touring/traveling/vacation involving riding in a vehicle": 2.0,
    "touring/traveling/vacation involving walking": 3.5,
    "camping involving standing, walking, sitting, light-to-moderate effort": 2.5,
    "sitting at a sporting event, spectator": 1.5,
  },
  10: {
    "accordion, sitting": 1.8,
    "cello, sitting": 2.3,
    "conducting orchestra, standing": 2.3,
    "double bass, standing": 2.5,
    "drums, sitting": 3.8,
    "drumming (e.g., bongo, conga, benbe), moderate, sitting": 3.0,
    "flute, sitting": 2.0,
    "horn, standing": 1.8,
    "piano, sitting": 2.3,
    "playing musical instruments, general": 2.0,
    "organ, sitting": 2.0,
    "trombone, standing": 3.5,
    "trumpet, standing": 1.8,
    "violin, sitting": 2.5,
    "woodwind, sitting": 1.8,
    "guitar, classical, folk, sitting": 2.0,
    "guitar, rock and roll band, standing": 3.0,
    "marching band, baton twirling, walking, moderate pace, general": 4.0,
    "marching band, playing an instrument, walking, brisk pace, general": 5.5,
    "marching band, drum major, walking": 3.5,
  },
  11: {
    "active workstation, treadmill desk, walking": 2.3,
    "airline flight attendant": 3.0,
    "bakery, general, moderate effort": 4.0,
    "bakery, light effort": 2.0,
    bookbinding: 2.3,
    "building road, driving heavy machinery": 6.0,
    "building road, directing traffic, standing": 2.0,
    "carpentry, general, light effort": 2.5,
    "carpentry, general, moderate effort": 4.3,
    "carpentry, general, heavy or vigorous effort": 7.0,
    "carrying heavy loads (e.g., bricks, tools)": 8.0,
    "carrying moderate loads up stairs, moving boxes 25-49 lbs": 8.0,
    "chambermaid, hotel housekeeper, making bed, cleaning bathroom, pushing cart": 4.0,
    "coal mining, drilling coal, rock": 5.3,
    "coal mining, erecting supports": 5.0,
    "coal mining, general": 5.5,
    "coal mining, shoveling coal": 6.3,
    "cook, chef": 2.5,
    "construction, outside, remodeling, new structures (e.g., roof repair, miscellaneous)": 4.0,
    "custodial work, light effort (e.g., cleaning sink and toilet, dusting, vacuuming, light cleaning)": 2.3,
    "custodial work, moderate effort (e.g., electric buffer, feathering arena floors, mopping, taking out trash, vacuuming)": 3.8,
    "electrical work (e.g., hook up wire, tapping-splicing)": 3.3,
    "engineer (e.g., mechanical or electrical)": 1.8,
    "farming, vigorous effort (e.g., baling hay, cleaning barn)": 7.8,
    "farming, moderate effort (e.g., feeding animals, chasing cattle by walking and/or horseback, spreading manure, harvesting crops)": 4.8,
    "farming, light effort (e.g., cleaning animal sheds, preparing animal feed)": 2.0,
    "farming, driving tasks (e.g., driving tractor or harvester)": 2.8,
    "farming, feeding small animals": 3.5,
    "farming, feeding cattle, horses": 4.3,
    "farming, hauling water for animals, general hauling water,farming, general hauling water": 4.3,
    "farming, taking care of animals (e.g., grooming, brushing, shearing sheep, assisting with birthing, medical care, branding), general": 4.5,
    "farming, rice, planting, grain milling activities": 3.8,
    "farming, milking by hand, cleaning pails, moderate effort": 3.5,
    "farming, milking by machine, light effort": 1.3,
    "fire fighter, general": 8.0,
    "fire fighter, rescue victim, automobile accident, using pike pole": 6.8,
    "fire fighter, raising and climbing ladder with full gear, simulated fire suppression": 8.0,
    "fire fighter, hauling hoses on ground, carrying/hoisting equipment, breaking down walls etc., wearing full gear": 9.0,
    "fishing, commercial, light effort": 3.5,
    "fishing, commercial, moderate effort": 5.0,
    "fishing, commercial, vigorous effort": 7.0,
    "forestry, ax chopping, very fast, 1.25 kg axe, 51 blows/min, extremely vigorous effort": 17.5,
    "forestry, ax chopping, slow, 1.25 kg axe, 19 blows/min, moderate effort": 5.0,
    "forestry, ax chopping, fast, 1.25 kg axe, 35 blows/min, vigorous effort": 8.0,
    "forestry, moderate effort (e.g., sawing wood with power saw, weeding, hoeing)": 4.5,
    "forestry, vigorous effort (e.g., barking, felling, or trimming trees, carrying or stacking logs, planting seeds, sawing lumber by hand)": 8.0,
    furriery: 4.5,
    "garbage collector, walking, dumping bins into truck": 4.0,
    "hairstylist (e.g., plaiting hair, manicure, make-up artist)": 1.8,
    "horse grooming, including feeding, cleaning stalls, bathing, brushing, clipping, longeing and exercising horses": 7.3,
    "horse, feeding, watering, cleaning stalls, implied walking and lifting loads": 4.3,
    "horse racing, galloping": 7.3,
    "horse racing, trotting": 5.8,
    "horse racing, walking": 3.8,
    "kitchen maid": 3.0,
    "lawn keeper, yard work, general": 4.0,
    "laundry worker": 3.3,
    locksmith: 3.0,
    "machine tooling (e.g., machining, working sheet metal, machine fitter, operating lathe, welding) light-to-moderate effort": 3.0,
    "Machine tooling, operating punch press, moderate effort": 5.0,
    "manager, property": 1.8,
    "manual or unskilled labor, general, light effort": 2.8,
    "manual or unskilled labor, general, moderate effort": 4.5,
    "manual or unskilled labor, general, vigorous effort": 6.5,
    "masonry, concrete, moderate effort": 4.3,
    "masonry, concrete, light effort": 2.5,
    "massage therapist, standing": 4.0,
    "moving, carrying or pushing heavy objects, 75 lbs or more, only active time (e.g., desks, moving van work)": 7.5,
    "skindiving or SCUBA diving as a frogman, Navy Seal": 12.0,
    "operating heavy duty equipment, automated, not driving": 2.5,
    "orange grove work, picking fruit": 4.5,
    "painting,house, furniture, moderate effort": 3.3,
    "plumbing activities": 3.0,
    "printing, paper industry worker, standing": 2.0,
    "police, directing traffic, standing": 2.5,
    "police, driving a squad car, sitting": 2.5,
    "police, riding in a squad car, sitting": 1.3,
    "police, making an arrest, standing": 4.0,
    "postal carrier, walking to deliver mail": 2.3,
    "shoe repair, general": 2.0,
    "shoveling, digging ditches": 7.8,
    "shoveling, more than 16 lbs/minute, deep digging, vigorous effort": 8.8,
    "shoveling, less than 10 lbs/minute, moderate effort": 5.0,
    "shoveling, 10 to 15 lbs/minute, vigorous effort": 6.5,
    "sitting tasks, light effort (e.g., office work, chemistry lab work, computer work, light assembly repair, watch repair, reading, desk work)": 1.5,
    "sitting meetings, light effort, general, and/or with talking involved (e.g., eating at a business meeting)": 1.5,
    "sitting tasks, moderate effort (e.g., pushing heavy levers, riding mower/forklift, crane operation)": 2.5,
    "sitting, teaching stretching or yoga, or light effort exercise class": 2.8,
    "standing tasks, light effort (e.g., bartending, store clerk, assembling, filing, duplicating, librarian, putting up a Christmas tree, standing and talking at work, changing clothes when teaching physical education, standing)": 3.0,
    "standing, light/moderate effort (e.g., assemble/repair heavy parts, welding,stocking parts,auto repair,standing, packing boxes, nursing patient care)": 3.0,
    "standing, moderate effort, lifting items continuously, 10 - 20 lbs, with limited walking or resting": 4.5,
    "standing, moderate effort, intermittent lifting 50 lbs, hitch/twisting ropes": 3.5,
    "standing, moderate/heavy tasks (e.g., lifting more than 50 lbs, masonry, painting, paper hanging)": 4.5,
    "steel mill, moderate effort (e.g., fettling, forging, tipping molds)": 5.3,
    "steel mill, vigorous effort (e.g., hand rolling, merchant mill rolling, removing slag, tending furnace)": 8.3,
    "tailoring, cutting fabric": 2.3,
    "tailoring, general": 2.5,
    "tailoring, hand sewing": 1.8,
    "tailoring, machine sewing": 2.5,
    "tailoring, pressing": 3.5,
    "tailoring, weaving, light effort (e.g., finishing operations, washing, dyeing, inspecting cloth, counting yards, paperwork)": 2.0,
    "tailoring, weaving, moderate effort (e.g., spinning and weaving operations, delivering boxes of yam to spinners, loading of warp bean, pinwinding, conewinding, warping, cloth cutting)": 4.0,
    "truck driving, loading and unloading truck, tying down load, standing, walking and carrying heavy loads": 6.5,
    "Truck, driving delivery truck, taxi, shuttlebus, school bus": 2.0,
    "typing, electric, manual or computer": 1.3,
    "using heavy power tools such as pneumatic tools (e.g., jackhammers, drills)": 6.3,
    "using heavy tools (not power) such as shovel, pick, tunnel bar, spade": 8.0,
    "walking on job, less than 2.0 mph, very slow speed, in office or lab area": 2.0,
    "walking on job, 3.0 mph, in office, moderate speed, not carrying anything": 3.5,
    "walking on job, 3.5 mph, in office, brisk speed, not carrying anything": 4.3,
    "walking on job, 2.5 mph, slow speed and carrying light objects less than 25 lbs": 3.5,
    "walking, gathering things at work, ready to leave": 3.0,
    "walking, 2.5 mph, slow speed, carrying heavy objects more than 25 lbs": 3.8,
    "walking, 3.0 mph, moderately and carrying light objects less than 25 lbs": 4.5,
    "walking, pushing a wheelchair": 3.5,
    "walking, 3.5 mph, briskly and carrying objects less than 25 lbs": 4.8,
    "walking or walk downstairs or standing, carrying objects about 25 to 49 lbs": 5.0,
    "walking or walk downstairs or standing, carrying objects about 50 to 74 lbs": 6.5,
    "walking or walk downstairs or standing, carrying objects about 75 to 99 lbs": 7.5,
    "walking or walk downstairs or standing, carrying objects about 100 lbs or more": 8.5,
    "working in scene shop, theater actor, backstage employee": 3.0,
  },
  12: {
    "jog/walk combination (jogging component of less than 10 minutes)": 6.0,
    "jogging, general": 7.0,
    "jogging, in place": 8.0,
    "jogging, on a mini-tramp": 4.5,
    "Running, 4 mph (13 min/mile)": 6.0,
    "running, 5 mph (12 min/mile)": 8.3,
    "running, 5.2 mph (11.5 min/mile)": 9.0,
    "running, 6 mph (10 min/mile)": 9.8,
    "running, 6.7 mph (9 min/mile)": 10.5,
    "running, 7 mph (8.5 min/mile)": 11.0,
    "running, 7.5 mph (8 min/mile)": 11.5,
    "running, 8 mph (7.5 min/mile)": 11.8,
    "running, 8.6 mph (7 min/mile)": 12.3,
    "running, 9 mph (6.5 min/mile)": 12.8,
    "running, 10 mph (6 min/mile)": 14.5,
    "running, 11 mph (5.5 min/mile)": 16.0,
    "running, 12 mph (5 min/mile)": 19.0,
    "running, 13 mph (4.6 min/mile)": 19.8,
    "running, 14 mph (4.3 min/mile)": 23.0,
    "running, cross country": 9.0,
    running: 8.0,
    "running, stairs, up": 15.0,
    "running, on a track, team practice": 10.0,
    "running, training, pushing a wheelchair or baby carrier": 8.0,
    "running, marathon": 13.3,
  },
  13: {
    "getting ready for bed, general, standing": 2.3,
    "sitting on toilet, eliminating while standing or squatting": 1.8,
    "bathing, sitting": 1.5,
    "dressing, undressing, standing or sitting": 2.5,
    "eating, sitting": 1.5,
    "talking and eating or eating only, standing": 2.0,
    "taking medication, sitting or standing": 1.5,
    "grooming, washing hands, shaving, brushing teeth, putting on make-up, sitting or standing": 2.0,
    "hairstyling, standing": 2.5,
    "having hair or nails done by someone else, sitting": 1.3,
    "showering, toweling off, standing": 2.0,
  },
  14: {
    "active, vigorous effort": 2.8,
    "general, moderate effort": 1.8,
    "passive, light effort, kissing, hugging": 1.3,
  },
  15: {
    "Alaska Native Games, Eskimo Olympics, general": 5.5,
    "archery, non-hunting": 4.3,
    "badminton, competitive": 7.0,
    "badminton, social singles and doubles, general": 5.5,
    "basketball, game": 8.0,
    "basketball, non-game, general": 6.0,
    "basketball, general": 6.5,
    "basketball, officiating": 7.0,
    "basketball, shooting baskets": 4.5,
    "basketball, drills, practice": 9.3,
    "basketball, wheelchair": 7.8,
    billiards: 2.5,
    bowling: 3.0,
    "bowling, indoor, bowling alley": 3.8,
    "boxing, in ring, general": 12.8,
    "boxing, punching bag": 5.5,
    "boxing, sparring": 7.8,
    broomball: 7.0,
    "children's games, adults playing (e.g., hopscotch, 4-square, dodgeball, playground apparatus, t-ball, tetherball, marbles, arcade games), moderate effort": 5.8,
    "cheerleading, gymnastic moves, competitive": 6.0,
    "coaching, football, soccer, basketball, baseball, swimming, etc.": 4.0,
    "coaching, actively playing sport with players": 8.0,
    "cricket, batting, bowling, fielding": 4.8,
    croquet: 3.3,
    curling: 4.0,
    "darts, wall or lawn": 2.5,
    "drag racing, pushing or driving a car": 6.0,
    "auto racing, open wheel": 8.5,
    fencing: 6.0,
    "football, competitive": 8.0,
    "football, touch, flag, general": 8.0,
    "football, touch, flag, light effort": 4.0,
    "football or baseball, playing catch": 2.5,
    "frisbee playing, general": 3.0,
    "frisbee, ultimate": 8.0,
    "golf, general": 4.8,
    "golf, walking, carrying clubs": 4.3,
    "golf, miniature, driving range": 3.0,
    "golf, walking, pulling clubs": 5.3,
    "golf, using power cart": 3.5,
    "gymnastics, general": 3.8,
    "hacky sack": 4.0,
    "handball, general": 12.0,
    "handball, team": 8.0,
    "high ropes course, multiple elements": 4.0,
    "hang gliding": 3.5,
    "hockey, field": 7.8,
    "hockey, ice, general": 8.0,
    "hockey, ice, competitive": 10.0,
    "horseback riding, general": 5.5,
    "horse chores, feeding, watering, cleaning stalls, implied walking and lifting loads": 4.3,
    "saddling, cleaning, grooming, harnessing and unharnessing horse": 4.5,
    "horseback riding, trotting": 5.8,
    "horseback riding, canter or gallop": 7.3,
    "horseback riding,walking": 3.8,
    "horseback riding, jumping": 9.0,
    "horse cart, driving, standing or sitting": 1.8,
    "horseshoe pitching, quoits": 3.0,
    "jai alai": 12.0,
    "martial arts, different types, slower pace, novice performers, practice": 5.3,
    "martial arts, different types, moderate pace (e.g., judo, jujitsu, karate, kick boxing, tae kwan do, tai-bo, Muay Thai boxing)": 10.3,
    juggling: 4.0,
    kickball: 7.0,
    lacrosse: 8.0,
    "lawn bowling, bocce ball, outdoor": 3.3,
    "moto-cross, off-road motor sports, all-terrain vehicle, general": 4.0,
    orienteering: 9.0,
    "paddleball, competitive": 10.0,
    "paddleball, casual, general": 6.0,
    "polo, on horseback": 8.0,
    "racquetball, competitive": 10.0,
    "racquetball, general": 7.0,
    "rock or mountain climbing": 8.0,
    "rock climbing, ascending rock, high difficulty": 7.5,
    "rock climbing, ascending or traversing rock, low-to-moderate difficulty": 5.8,
    "rock climbing, rappelling": 5.0,
    "rodeo sports, general, light effort": 4.0,
    "rodeo sports, general, moderate effort": 5.5,
    "rodeo sports, general, vigorous effort": 7.0,
    "rope jumping, fast pace, 120-160 skips/min": 12.3,
    "rope jumping, moderate pace, 100-120 skips/min, general, 2 foot skip, plain bounce": 11.8,
    "rope jumping, slow pace, < 100 skips/min, 2 foot skip, rhythm bounce": 8.8,
    "rugby, union, team, competitive": 8.3,
    "rugby, touch, non-competitive": 6.3,
    shuffleboard: 3.0,
    "skateboarding, general, moderate effort": 5.0,
    "skateboarding, competitive, vigorous effort": 6.0,
    "skating, roller": 7.0,
    "rollerblading, in-line skating, 14.4 km/h (9.0 mph), recreational pace": 7.5,
    "rollerblading, in-line skating, 17.7 km/h (11.0 mph), moderate pace, exercise training": 9.8,
    "rollerblading, in-line skating, 21.0 to 21.7 km/h (13.0 to 13.6 mph), fast pace, exercise training": 12.3,
    "rollerblading, in-line skating, 24.0 km/h (15.0 mph), maximal effort": 14.0,
    "skydiving, base jumping, bungee jumping": 3.5,
    "soccer, competitive": 10.0,
    "soccer, casual, general": 7.0,
    "softball or baseball, fast or slow pitch, general": 5.0,
    "softball, practice": 4.0,
    "softball, officiating": 4.0,
    "softball, pitching": 6.0,
    "sports spectator, very excited, emotional, physically moving": 3.3,
    squash: 12.0,
    "squash, general": 7.3,
    "table tennis, ping pong": 4.0,
    "tai chi, qi gong, general": 3.0,
    "tai chi, qi gong, sitting, light effort": 1.5,
    "tennis, general": 7.3,
    "tennis, doubles": 4.5,
    "tennis, singles": 8.0,
    "tennis, hitting balls, non-game play, moderate effort": 5.0,
    "trampoline, recreational": 3.5,
    "trampoline, competitive": 4.5,
    volleyball: 4.0,
    "volleyball, competitive, in gymnasium": 6.0,
    "volleyball, non-competitive, 6 - 9 member team, general": 3.0,
    "volleyball, beach, in sand": 8.0,
    "wrestling (one match = 5 minutes)": 6.0,
    "wallyball, general": 7.0,
    "track and field (e.g., shot, discus, hammer throw)": 4.0,
    "track and field (e.g., high jump, long jump, triple jump, javelin, pole vault)": 6.0,
    "track and field (e.g., steeplechase, hurdles)": 10.0,
  },
  16: {
    "automobile or light truck (not a semi) driving": 2.5,
    "riding in a car or truck": 1.3,
    "riding in a bus or train": 1.3,
    "flying airplane or helicopter": 1.8,
    "motor scooter, motorcycle": 3.5,
    "pulling rickshaw": 6.3,
    "pushing plane in and out of hangar": 6.0,
    "truck, semi, tractor, > 1 ton, or bus, driving": 2.5,
    "walking for transportation, 2.8-3.2 mph, level, moderate pace, firm surface": 3.5,
  },
  17: {
    backpacking: 7.0,
    "backpacking, hiking or organized walking with a daypack": 7.8,
    "carrying 15 pound load (e.g. suitcase), level ground or downstairs": 5.0,
    "carrying 15 lb child, slow walking": 2.3,
    "carrying load upstairs, general": 8.3,
    "carrying 1 to 15 lb load, upstairs": 5.0,
    "carrying 16 to 24 lb load, upstairs": 6.0,
    "carrying 25 to 49 lb load, upstairs": 8.0,
    "carrying 50 to 74 lb load, upstairs": 10.0,
    "carrying > 74 lb load, upstairs": 12.0,
    "loading /unloading a car, implied walking": 3.5,
    "climbing hills, no load": 6.3,
    "climbing hills with 0 to 9 lb load": 6.5,
    "climbing hills with 10 to 20 lb load": 7.3,
    "climbing hills with 21 to 42 lb load": 8.3,
    "climbing hills with 42+ lb load": 9.0,
    "descending stairs": 3.5,
    "hiking, cross country": 6.0,
    "hiking or walking at a normal pace through fields and hillsides": 5.3,
    "bird watching, slow walk": 2.5,
    "marching, moderate speed, military, no pack": 4.5,
    "marching rapidly, military, no pack": 8.0,
    "pushing or pulling stroller with child or walking with children, 2.5 to 3.1 mph": 4.0,
    "pushing a wheelchair, non-occupational": 3.8,
    "race walking": 6.5,
    "stair climbing, using or climbing up ladder": 8.0,
    "stair climbing, slow pace": 4.0,
    "stair climbing, fast pace": 8.8,
    "using crutches": 5.0,
    "walking, household": 2.0,
    "walking, less than 2.0 mph, level, strolling, very slow": 2.0,
    "walking, 2.0 mph, level, slow pace, firm surface": 2.8,
    "walking for pleasure": 3.5,
    "walking from house to car or bus, from car or bus to go places, from car or bus to and from the worksite": 2.5,
    "walking to neighbor's house or family's house for social reasons": 2.5,
    "walking the dog": 3.0,
    "walking, 2.5 mph, level, firm surface": 3.0,
    "walking, 2.5 mph, downhill": 3.3,
    "walking, 2.8 to 3.2 mph, level, moderate pace, firm surface": 3.5,
    "walking, 3.5 mph, level, brisk, firm surface, walking for exercise": 4.3,
    "walking, 2.9 to 3.5 mph, uphill, 1 to 5% grade": 5.3,
    "walking, 2.9 to 3.5 mph, uphill, 6% to 15% grade": 8.0,
    "walking, 4.0 mph, level, firm surface, very brisk pace": 5.0,
    "walking, 4.5 mph, level, firm surface, very, very brisk": 7.0,
    "walking, 5.0 mph, level, firm surface": 8.3,
    "walking, 5.0 mph, uphill, 3% grade": 9.8,
    "walking, for pleasure, work break": 3.5,
    "walking, grass track": 4.8,
    "walking, normal pace, plowed field or sand": 4.5,
    "walking, to work or class": 4.0,
    "walking, to and from an outhouse": 2.5,
    "walking, for exercise, 3.5 to 4 mph, with ski poles, Nordic walking, level, moderate pace": 4.8,
    "walking, for exercise, 5.0 mph, with ski poles, Nordic walking, level, fast pace": 9.5,
    "walking, for exercise, with ski poles, Nordic walking, uphill": 6.8,
    "walking, backwards, 3.5 mph, level": 6.0,
    "walking, backwards, 3.5 mph, uphill, 5% grade": 8.0,
  },
  18: {
    "boating, power, driving": 2.5,
    "boating, power, passenger, light": 1.3,
    "canoeing, on camping trip": 4.0,
    "canoeing, harvesting wild rice, knocking rice off the stalks": 3.3,
    "canoeing, portaging": 7.0,
    "canoeing, rowing, 2.0-3.9 mph, light effort": 2.8,
    "canoeing, rowing, 4.0-5.9 mph, moderate effort": 5.8,
    "canoeing, rowing, kayaking, competition, >6 mph, vigorous effort": 12.5,
    "canoeing, rowing, for pleasure, general": 3.5,
    "canoeing, rowing, in competition, or crew or sculling": 12.0,
    "diving, springboard or platform": 3.0,
    "kayaking, moderate effort": 5.0,
    "paddle boat": 4.0,
    "sailing, boat and board sailing, windsurfing, ice sailing, general": 3.0,
    "sailing, in competition": 4.5,
    "sailing, Sunfish/Laser/Hobby Cat, Keel boats, ocean sailing, yachting, leisure": 3.3,
    "skiing, water or wakeboarding": 6.0,
    "jet skiing, driving, in water": 7.0,
    "skindiving, fast": 15.8,
    "skindiving, moderate": 11.8,
    "skindiving, scuba diving, general": 7.0,
    snorkeling: 5.0,
    "surfing, body or board, general": 3.0,
    "surfing, body or board, competitive": 5.0,
    "paddle boarding, standing": 6.0,
    "swimming laps, freestyle, fast, vigorous effort": 9.8,
    "swimming laps, freestyle, front crawl, slow, light or moderate effort": 5.8,
    "swimming, backstroke, general, training or competition": 9.5,
    "swimming, backstroke, recreational": 4.8,
    "swimming, breaststroke, general, training or competition": 10.3,
    "swimming, breaststroke, recreational": 5.3,
    "swimming, butterfly, general": 13.8,
    "swimming, crawl, fast speed, ~75 yards/minute, vigorous effort": 10.0,
    "swimming, crawl, medium speed, ~50 yards/minute, vigorous effort": 8.3,
    "swimming, lake, ocean, river": 6.0,
    "swimming, leisurely, not lap swimming, general": 6.0,
    "swimming, sidestroke, general": 7.0,
    "swimming, synchronized": 8.0,
    "swimming, treading water, fast, vigorous effort": 9.8,
    "swimming, treading water, moderate effort, general": 3.5,
    "tubing, floating on a river, general": 2.3,
    "water aerobics, water calisthenics": 5.5,
    "water polo": 10.0,
    "water volleyball": 3.0,
    "water jogging": 9.8,
    "water walking, light effort, slow pace": 2.5,
    "water walking, moderate effort, moderate pace": 4.5,
    "water walking, vigorous effort, brisk pace": 6.8,
    "whitewater rafting, kayaking, or canoeing": 5.0,
    "windsurfing, not pumping for speed": 5.0,
    "windsurfing or kitesurfing, crossing trial": 11.0,
    "windsurfing, competition, pumping for speed": 13.5,
  },
  19: {
    "dog sledding, mushing": 7.5,
    "dog sledding, passenger": 2.5,
    "moving ice house, set up/drill holes": 6.0,
    "ice fishing, sitting": 2.0,
    "skating, ice dancing": 14.0,
    "skating, ice, 9 mph or less": 5.5,
    "skating, ice, general": 7.0,
    "skating, ice, rapidly, more than 9 mph, not competitive": 9.0,
    "skating, speed, competitive": 13.3,
    "ski jumping, climb up carrying skis": 7.0,
    "skiing, general": 7.0,
    "skiing, cross country, 2.5 mph, slow or light effort, ski walking": 6.8,
    "skiing, cross country, 4.0-4.9 mph, moderate speed and effort, general": 9.0,
    "skiing, cross country, 5.0-7.9 mph, brisk speed, vigorous effort": 12.5,
    "skiing, cross country, >8.0 mph, elite skier, racing": 15.0,
    "skiing, cross country, hard snow, uphill, maximum, snow mountaineering": 15.5,
    "skiing, cross-country, skating": 13.3,
    "skiing, cross-country, biathlon, skating technique": 13.5,
    "skiing, downhill, alpine or snowboarding, light effort, active time only": 4.3,
    "skiing, downhill, alpine or snowboarding, moderate effort, general, active time only": 5.3,
    "skiing, downhill, vigorous effort, racing": 8.0,
    "skiing, roller, elite racers": 12.5,
    "sledding, tobogganing, bobsledding, luge": 7.0,
    "snow shoeing, moderate effort": 5.3,
    "snow shoeing, vigorous effort": 10.0,
    "snowmobiling, driving, moderate": 3.5,
    "snowmobiling, passenger": 2.0,
    "snow shoveling, by hand, moderate effort": 5.3,
    "snow shoveling, by hand, vigorous effort": 7.5,
    "snow blower, walking and pushing": 2.5,
  },
  20: {
    "sitting in church, in service, attending a ceremony, sitting quietly": 1.3,
    "sitting, playing an instrument at church": 2.0,
    "sitting in church, talking or singing, attending a ceremony, sitting, active participation": 1.8,
    "sitting, reading religious materials at home": 1.3,
    "standing quietly in church, attending a ceremony": 1.3,
    "standing, singing in church, attending a ceremony, standing, active participation": 2.0,
    "kneeling in church or at home, praying": 1.3,
    "standing, talking in church": 1.8,
    "walking in church": 2.0,
    "walking, less than 2.0 mph, very slow": 2.0,
    "walking, 3.0 mph, moderate speed, not carrying anything": 3.5,
    "walking, 3.5 mph, brisk speed, not carrying anything": 4.3,
    "walk/stand combination for religious purposes, usher": 2.0,
    "praise with dance or run, spiritual dancing in church": 5.0,
    "serving food at church": 2.5,
    "preparing food at church": 2.0,
    "washing dishes, cleaning kitchen at church": 3.3,
    "eating at church": 1.5,
    "eating/talking at church or standing eating, American Indian Feast days": 2.0,
    "cleaning church": 3.3,
    "general yard work at church": 4.0,
    "standing, moderate effort (e.g., lifting heavy objects, assembling at fast rate)": 3.5,
    "Standing, moderate-to-heavy effort, manual labor, lifting 50 lbs, heavy maintenance": 4.5,
    "typing, electric, manual, or computer": 1.3,
  },
  21: {
    "sitting, meeting, general, and/or with talking involved": 1.5,
    "sitting, light office work, in general": 1.5,
    "sitting, moderate work": 2.5,
    "standing, light work (filing, talking, assembling)": 2.3,
    "sitting, child care, only active periods": 2.0,
    "standing, child care, only active periods": 3.0,
    "walk/run play with children, moderate, only active periods": 3.5,
    "walk/run play with children, vigorous, only active periods": 5.8,
    "standing, light/moderate work (e.g., pack boxes, assemble/repair, set up chairs/furniture)": 3.0,
    "standing, moderate (lifting 50 lbs., assembling at fast rate)": 3.5,
    "standing, moderate/heavy work": 4.5,
    "typing, electric, manual, or computer": 1.3,
    "walking, less than 2.0 mph, very slow": 2.0,
    "walking, 3.0 mph, moderate speed, not carrying anything": 3.5,
    "walking, 3.5 mph, brisk speed, not carrying anything": 4.3,
    "walking, 2.5 mph slowly and carrying objects less than 25 lbs": 3.5,
    "walking, 3.0 mph moderately and carrying objects less than 25 lbs, pushing something": 4.5,
    "walking, 3.5 mph, briskly and carrying objects less than 25 lbs": 4.8,
    "walk/stand combination, for volunteer purposes": 3.0,
  },
};

const Activity_Table = {
  1: "Bicycling",
  2: "Conditioning Exercise",
  3: "Dancing",
  4: "Fishing and Hunting",
  5: "Home Activities",
  6: "Home Repair",
  7: "Inactivity Quiet/Light",
  8: "Lawn and Garden",
  9: "Miscellaneous",
  10: "Music Playing",
  11: "Occupation",
  12: "Running",
  13: "Self Care",
  14: "Sexual Activity",
  15: "Sports",
  16: "Transportation",
  17: "Walking",
  18: "Water Activities",
  19: "Winter Activities",
  20: "Religious Activities",
  21: "Volunteer Activities",
};

class SelfReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity_choice: null,
      des_choice: null,
      time: 0,
      des_string: "",
      total_result: 0,
      total_mile: 0,
      table_array: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDesChange = this.handleDesChange.bind(this);
    this.calculating = this.calculating.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.deleteLastRow = this.deleteLastRow.bind(this);
    this.toObject = this.toObject.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  calculating() {
    if (!this.state.time) {
      alert("Please enter valid time");
    } else if (!this.state.des_choice) {
      alert("Please choose valid activity and description");
    } else {
      const metValue = this.state.des_choice;
      const weight = database_weight;
      const time = this.state.time;
      const result = metValue * weight * time;
      const result2 = (Math.round(time * 60) / 57).toFixed(2);
      {
        console.log(weight);
      }
      const el = document.getElementById("result");
      el.innerText = result;
      const el2 = document.getElementById("result2");
      el2.innerText = result2;
      this.setState({
        total_result: result,
        total_mile: result2,
      });

      this.setState({
        table_array: [
          ...this.state.table_array,
          {
            time: time,
            activity: this.state.activity_choice,
            des: this.state.des_string,
            res_calories: result,
            res_mile: result2,
          },
        ],
      });
    }
  }

  handleChange(e) {
    this.setState({
      activity_choice: e.target.value,
    });
  }

  handleDesChange(e) {
    var index = e.nativeEvent.target.selectedIndex;
    var choice = e.nativeEvent.target[index].text;
    const el = document.getElementById("activity");
    el.innerText = choice;
    this.setState({
      des_choice: e.target.value,
      des_string: choice,
    });
  }

  handleTimeUpdate(e) {
    this.setState({
      time: e.target.value,
    });
  }

  getTableRow() {
    return this.state.table_array.map((x) => (
      <tr>
        <td className="border-1 border-slate-500">{x.time ? x.time : ""}</td>
        <td className="border-1 border-slate-500">
          {Activity_Table[x.activity ? x.activity : ""]}
        </td>
        <td className="border-1 border-slate-500">{x.des ? x.des : ""}</td>
        <td className="border-1 border-slate-500">
          {x.res_calories ? x.res_calories : ""}
        </td>
        <td className="border-1 border-slate-500">
          {x.res_mile ? x.res_mile : ""}
        </td>
      </tr>
    ));
  }

  deleteLastRow() {
    this.setState({
      table_array: this.state.table_array.slice(0, -1),
    });
  }

  toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i) rv[i] = arr[i];
    return rv;
  }

  submitData() {
    if (this.state.table_array.length == 0) {
      alert("Please enter the data!");
    } else {
      writeSelfReortData(uid, u_name, this.toObject(this.state.table_array));
    }
  }

  render() {
    const auth = getAuth();
    const user = auth.currentUser;
    //console.log(user);
    uid = user.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `profile/${user["uid"]}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //console.log(snapshot.val());
          database_weight = snapshot.val().weight;
          u_name = snapshot.val().displayname;
          //console.log(u_name);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    const descriptionOption = Metabolic_equivalent_table[
      this.state.activity_choice
    ] ? (
      Object.entries(
        Metabolic_equivalent_table[this.state.activity_choice]
      ).map(([key, value]) => {
        return <option value={value}>{key}</option>;
      })
    ) : (
      <option>Select an activity first</option>
    );

    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header
          category="Page"
          title="Self-Report Portal: METs Calculator "
        />

        <div id="MET">
          <label>Activity Time:</label>
          <br />

          <input
            className="border-2 border-slate-500"
            type="text"
            name="time"
            id="time"
            onChange={this.handleTimeUpdate}
            required
          />
          <select id="timeUnit">
            <option value="hr">hr</option>
          </select>
          <br />
          <br />

          <label>Activity:</label>
          <br />
          <select
            id="activities"
            className="border-2 border-slate-500"
            onChange={this.handleChange}
            required
          >
            <option
              value="0"
              selected=""
              disabled=""
              className="border-2 border-slate-500"
            >
              --Select an Activity--
            </option>
            <option value="1">Bicycling</option>
            <option value="2">Conditioning Exercise</option>
            <option value="3">Dancing</option>
            <option value="4">Fishing and Hunting</option>
            <option value="5">Home Activities</option>
            <option value="6">Home Repair</option>
            <option value="7">Inactivity Quiet/Light</option>
            <option value="8">Lawn and Garden</option>
            <option value="9">Miscellaneous</option>
            <option value="10">Music Playing</option>
            <option value="11">Occupation</option>
            <option value="12">Running</option>
            <option value="13">Self Care</option>
            <option value="14">Sexual Activity</option>
            <option value="15">Sports</option>
            <option value="16">Transportation</option>
            <option value="17">Walking</option>
            <option value="18">Water Activities</option>
            <option value="19">Winter Activities</option>
            <option value="20">Religious Activities</option>
            <option value="21">Volunteer Activities</option>
          </select>

          <br />
          <br />

          <label>Description:</label>
          <br />
          <select
            id="descriptions"
            className="border-2 border-slate-500"
            onChange={this.handleDesChange}
            required
          >
            {this.state.activity_choice ? (
              <option value="-1">Select a description</option>
            ) : (
              <option>Select an Activity First</option>
            )}
            {descriptionOption}
          </select>

          <br />
          <br />

          <label>Activity Selected: </label>
          <span id="activity"></span>
          <br />
          <br />
          <label>METs: {this.state.des_choice}</label>
          <br />
          <span id="textMets"></span>
          <br />

          <button
            className="border-2 border-slate-500 bg-slate-300"
            onClick={this.calculating}
          >
            Calculate
          </button>
          <br />
          <br />

          <label>Total Calories Burned:</label>
          <br />
          <div id="result"></div>
          <br />

          <label>Total Exercise Miles:</label>
          <br />
          <div id="result2"></div>
          <br />

          <div id="MET-Result">
            <h1>
              <b className="text-2xl">Results Table</b>
              <p>* Please input and calculate all activities before submit.</p>
            </h1>
            <table className="border-2 border-slate-500 divide-x divide-y divide-solid divide-black">
              <th>Activity Time</th>
              <th>Activity</th>
              <th>Description</th>
              <th>Total Calories Burned </th>
              <th>Total Exercise Miles </th>
              {this.getTableRow()}
            </table>
            <br />

            <button
              className="border-2 border-slate-500 bg-slate-300"
              onClick={this.deleteLastRow}
            >
              Delete Last Row
            </button>

            <br />
            <br />

            <button
              className="border-2 border-slate-500 bg-slate-300"
              onClick={this.submitData}
            >
              Confirm and Submit
            </button>

            <br />
            <br />
          </div>

          <div id="introduction">
            <h1 className="text-3xl">
              <b>Definition</b>
            </h1>
            <p>
              The metabolic equivalent of task (MET) is the ratio of the
              metabolic rate during exercise to the metabolic rate at rest. One
              MET corresponds to an energy expenditure of 1 kcal/kg/hour. One
              MET can also be expressed as oxygen uptake of 3.5 ml/kg/min.
            </p>
            <br />
            <p>
              METs are used to estimate how many calories are burned during many
              common physical activities.
            </p>
            <br />

            <h1 className="text-3xl">
              <b>How it works</b>
            </h1>
            <p>
              We will demonstrate how the calculator works with a simple
              example:
            </p>
            <p>
              Susan is a 70kg (~154 lbs) woman who walked her dog for exactly 30
              min. According to the metabolic equivalent table , walking the dog
              corresponds to an energy expediture of 3.0 METs. In order to
              perform the calculation, all we have to do is to multiply the
              weight (kg), the metabolic equivalent of a task (MET) and the time
              of the activity (hr).
            </p>

            <br />
            <p>Remember that 1 MET = 1 kcal/kg/hr</p>
            <br />

            <p>
              Units of time must be converted to hours. Therefore, 30 min = 0.5
              hr
            </p>
            <br />

            <p className="text-xl">
              <b>
                Calories burned = 70 kg x 3 kcal/kg/hr x 0.5 hr = 105 kcals
                burned
              </b>
            </p>
            <br />

            <p>
              It is important to know that this formula does not take into
              consideration characteristics such as age and sex and should only
              be used as estimates.
            </p>
            <p>
              Still complicated? Don't worry, our calculator will do all the
              math for you! Just type your values and choose the most
              appropriate activity.
            </p>

            <br />

            <h1 className="text-3xl">
              <b>Common Activities</b>
            </h1>
            <table className="border-2 border-slate-500 divide-x divide-y divide-solid divide-black">
              <th className="bg-green-300">Light Intensity Activities </th>
              <th className="bg-green-300">METs</th>
              <tr>
                <td className="border-1 border-slate-500">Sleeping</td>
                <td className="border-1 border-slate-500">0.95</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Watching television
                </td>
                <td className="border-1 border-slate-500">1.0</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Writing, desk work, typing
                </td>
                <td className="border-1 border-slate-500">1.3</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Walking, household
                </td>
                <td className="border-1 border-slate-500">2.0</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Walking, 2.0 mph (3.2 km/h)
                </td>
                <td className="border-1 border-slate-500">2.8</td>
              </tr>

              <th className="bg-green-300">Moderate Intensity Activities</th>
              <th className="bg-green-300">METs</th>
              <tr>
                <td className="border-1 border-slate-500">Walking the dog</td>
                <td className="border-1 border-slate-500">3.0</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Walking, 2.8 - 3.2 mph (4.5 - 5.1 km/h), level, moderate pace
                </td>
                <td className="border-1 border-slate-500">3.5</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Calisthenics, (e.g., push ups, sit ups, pull-ups, lunges),
                  moderate effort
                </td>
                <td className="border-1 border-slate-500">3.8</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Yard work, general, moderate effort
                </td>
                <td className="border-1 border-slate-500">4.0</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Mowing lawn, general
                </td>
                <td className="border-1 border-slate-500">5.5</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Bicycling, leisure, 9.4 mph (15.1 km/h)
                </td>
                <td className="border-1 border-slate-500">5.8</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Swimming laps, freestyle, light or moderate effort
                </td>
                <td className="border-1 border-slate-500">5.8</td>
              </tr>

              <th className="bg-green-300">Vigorous Intensity Activities</th>
              <th className="bg-green-300">METs</th>
              <tr>
                <td className="border-1 border-slate-500">Jogging, general</td>
                <td className="border-1 border-slate-500">7.0</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Snow shoveling, by hand, vigorous effort
                </td>
                <td className="border-1 border-slate-500">7.5</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Running, 5 mph (8.0 km/h)
                </td>
                <td className="border-1 border-slate-500">8.3</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Stair-treadmill ergometer, general
                </td>
                <td className="border-1 border-slate-500">9.0</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Swimming laps, freestyle, fast, vigorous effort
                </td>
                <td className="border-1 border-slate-500">9.8</td>
              </tr>
              <tr>
                <td className="border-1 border-slate-500">
                  Running, 8 mph (12.9 km/h)
                </td>
                <td className="border-1 border-slate-500">11.8</td>
              </tr>
            </table>

            <p>
              * Values displayed are part of the most recent version of the
              Compendium of Physical Activities.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SelfReport;
