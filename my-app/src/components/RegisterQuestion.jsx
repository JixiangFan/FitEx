import React from 'react';
import { useForm } from 'react-hook-form';

export default function RegisterQuestion() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register("Name", {required: true, maxLength: 20})} />
      <select {...register("State", { required: true })}>
        <option value="Alaska">Alaska</option>
        <option value=" Alabama"> Alabama</option>
        <option value=" Arkansas"> Arkansas</option>
        <option value=" American Samoa"> American Samoa</option>
        <option value=" Arizona"> Arizona</option>
        <option value=" California"> California</option>
        <option value=" Colorado"> Colorado</option>
        <option value=" Connecticut"> Connecticut</option>
        <option value=" District  of Columbia"> District of Columbia</option>
        <option value=" Delaware"> Delaware</option>
        <option value=" Florida"> Florida</option>
        <option value=" Georgia"> Georgia</option>
        <option value=" Guam"> Guam</option>
        <option value=" Hawaii"> Hawaii</option>
        <option value=" Iowa"> Iowa</option>
        <option value=" Idaho"> Idaho</option>
        <option value=" Illinois"> Illinois</option>
        <option value=" Indiana"> Indiana</option>
        <option value=" Kansas"> Kansas</option>
        <option value=" Kentucky"> Kentucky</option>
        <option value=" Louisiana"> Louisiana</option>
        <option value=" Massachusetts"> Massachusetts</option>
        <option value=" Maryland"> Maryland</option>
        <option value=" Maine"> Maine</option>
        <option value=" Michigan"> Michigan</option>
        <option value=" Minnesota"> Minnesota</option>
        <option value=" Missouri"> Missouri</option>
        <option value=" Mississippi"> Mississippi</option>
        <option value=" Montana"> Montana</option>
        <option value=" North Carolina"> North Carolina</option>
        <option value=" North Dakota"> North Dakota</option>
        <option value=" Nebraska"> Nebraska</option>
        <option value=" New Hampshire"> New Hampshire</option>
        <option value=" New Jersey"> New Jersey</option>
        <option value=" New Mexico"> New Mexico</option>
        <option value=" Nevada"> Nevada</option>
        <option value=" New York"> New York</option>
        <option value=" Ohio"> Ohio</option>
        <option value=" Oklahoma"> Oklahoma</option>
        <option value=" Oregon"> Oregon</option>
        <option value=" Pennsylvania"> Pennsylvania</option>
        <option value=" Puerto Rico"> Puerto Rico</option>
        <option value=" Rhode Island"> Rhode Island</option>
        <option value=" South Carolina"> South Carolina</option>
        <option value=" South Dakota"> South Dakota</option>
        <option value=" Tennessee"> Tennessee</option>
        <option value=" Texas"> Texas</option>
        <option value=" Utah"> Utah</option>
        <option value=" Virginia"> Virginia</option>
        <option value=" Virgin Islands"> Virgin Islands</option>
        <option value=" Vermont"> Vermont</option>
        <option value=" Washington"> Washington</option>
        <option value=" Wisconsin"> Wisconsin</option>
        <option value=" West Virginia"> West Virginia</option>
        <option value=" Wyoming"> Wyoming</option>
      </select>
      <select {...register("Do you own a smpartphone?", { required: true })}>
        <option value="I own an Android">I own an Android</option>
        <option value=" I own an iphone"> I own an iphone</option>
        <option value=" Other"> Other</option>
        <option value=" No smartphone"> No smartphone</option>
      </select>
      <input type="number" placeholder="Age" {...register("Age", {required: true, maxLength: 12})} />
      <select {...register("Sex", { required: true })}>
        <option value="Male">Male</option>
        <option value=" Female"> Female</option>
        <option value=" Prefer not to answer"> Prefer not to answer</option>
      </select>
      <input type="number" placeholder="Weight(pounds)" {...register("Weight(pounds)", {})} />
      <input type="number" placeholder="Height(ft,in)" {...register("Height(ft,in)", {required: true})} />
      <select {...register("Ethnicity: “Do you consider yourself to be Hispanic or Latino?”")}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Prefer not to answer">Prefer not to answer</option>
      </select>
      <select {...register("Race: “Which of the following best describes you? ”")}>
        <option value="Black/African American">Black/African American</option>
        <option value="Asian">Asian</option>
        <option value="White">White</option>
        <option value="American Indian/Native Alaskan">American Indian/Native Alaskan</option>
        <option value="Native">Native</option>
        <option value="Prefer not to answerOther Hawaiian/Pacific Islander">Prefer not to answerOther Hawaiian/Pacific Islander</option>
      </select>
      <select {...register("What is your present employment status?")}>
        <option value="Workplace">Workplace</option>
        <option value="Family">Family</option>
        <option value="School">School</option>
        <option value="Church">Church</option>
        <option value="Community">Community</option>
      </select>
      <select {...register("“My team is made up of people in my (check all that apply):”")}>
        <option value="Workplace">Workplace</option>
        <option value="Family">Family</option>
        <option value="School">School</option>
        <option value="Church">Church</option>
        <option value="Community">Community</option>
      </select>
      <select {...register("Please mark the highest grade of school that you have completed.")}>
        <option value="Grades 0-8">Grades 0-8</option>
        <option value="Grades 9-11">Grades 9-11</option>
        <option value="High school graduate">High school graduate</option>
        <option value="Some college">Some college</option>
        <option value="College graduate">College graduate</option>
        <option value="Post college work">Post college work</option>
      </select>
      <select {...register("Has your doctor ever informed you that you have any of the following conditions:")}>
        <option value="Hypertension">Hypertension</option>
        <option value="Diabetes">Diabetes</option>
        <option value="Cancer">Cancer</option>
        <option value="Heart disease">Heart disease</option>
        <option value="Arthritis">Arthritis</option>
        <option value="Don’t know">Don’t know</option>
      </select>
      <select {...register("In general, compared to others your age, how would you rate your health:")}>
        <option value="Extremely healthy">Extremely healthy</option>
        <option value="Somewhat healthy">Somewhat healthy</option>
        <option value="Not healthy">Not healthy</option>
        <option value="Very healthy">Very healthy</option>
        <option value="Don’t know">Don’t know</option>
      </select>
      <select {...register("During the past month, which statement best describes the kinds of physical activity you usually did? Do not include the time you spent working at a job. Please read all six statements before SELECTING ONE.")}>
        <option value="I did not do much physical activity. I mostly did things like watching television, reading, playing cards, or playing computer games. Only occasionally, no more than once or twice a month, did I do anything more active such as going for a walk or playing tennis.">I did not do much physical activity. I mostly did things like watching television, reading, playing cards, or playing computer games. Only occasionally, no more than once or twice a month, did I do anything more active such as going for a walk or playing tennis.</option>
        <option value="Once or twice a week, I did light activities such as getting outdoors on the weekends for an easy walk or stroll. Or once or twice a week, I did chores around the house such as sweeping floors or vacuuming.">Once or twice a week, I did light activities such as getting outdoors on the weekends for an easy walk or stroll. Or once or twice a week, I did chores around the house such as sweeping floors or vacuuming.</option>
        <option value="About three times a week, I did moderate activities such as brisk walking, swimming, or riding a bike for about 15–20 minutes each time. Or about once a week, I did moderately difficult chores such as raking or mowing the lawn for about 45–60 minutes. Or about once a week, I played sports such as softball, basketball, or soccer for about 45–60 minutes.">About three times a week, I did moderate activities such as brisk walking, swimming, or riding a bike for about 15–20 minutes each time. Or about once a week, I did moderately difficult chores such as raking or mowing the lawn for about 45–60 minutes. Or about once a week, I played sports such as softball, basketball, or soccer for about 45–60 minutes.</option>
        <option value="Almost daily, that is five or more times a week, I did moderate activities such as brisk walking, swimming, or riding a bike for 30 minutes or more each time. Or about once a week, I did moderately difficult chores or played sports for 2 hours or more.">Almost daily, that is five or more times a week, I did moderate activities such as brisk walking, swimming, or riding a bike for 30 minutes or more each time. Or about once a week, I did moderately difficult chores or played sports for 2 hours or more.</option>
        <option value="About three times a week, I did vigorous activities such as running or riding hard on a bike for 30 minutes or more each time.">About three times a week, I did vigorous activities such as running or riding hard on a bike for 30 minutes or more each time.</option>
        <option value="Almost daily, that is five or more times a week, I did vigorous activities such as running or riding hard on a bike for 30 minutes or more each time.">Almost daily, that is five or more times a week, I did vigorous activities such as running or riding hard on a bike for 30 minutes or more each time.</option>
      </select>
      <select {...register("Physical Activity Location Frequency: “Over the next 8 weeks, I plan to do my physical activities indoors")}>
        <option value="Never">Never</option>
        <option value="Seldom">Seldom</option>
        <option value="Sometimes">Sometimes</option>
        <option value="Often">Often</option>
      </select>
      <select {...register("Over the next 8 weeks, I plan to do my physical activities outdoor")}>
        <option value="Never">Never</option>
        <option value="Seldom">Seldom</option>
        <option value="Sometimes">Sometimes</option>
        <option value="Often">Often</option>
      </select>
      <select {...register("What resources does your community have for ​being physically active? Please check all that apply.", { required: true })}>
        <option value="Paved Traill">Paved Traill</option>
        <option value="Unpaved Trail">Unpaved Trail</option>
        <option value="Open green space">Open green space</option>
        <option value="Neighborhood sidewalk">Neighborhood sidewalk</option>
        <option value="City/Town sidewalk">City/Town sidewalk</option>
        <option value="Athletic field/court">Athletic field/court</option>
        <option value="Outdoor park">Outdoor park</option>
        <option value="Gym">Gym</option>
        <option value="Fitness facility Malls">Fitness facility Malls</option>
        <option value="Faith-based organization's building">Faith-based organization's building</option>
        <option value="Community center">Community center</option>
        <option value="Personal residence">Personal residence</option>
        <option value="Do not know of any resources">Do not know of any resources</option>
      </select>
      <input type="text" placeholder="On average, how many cups of fruit do you eat each day?" {...register("On average, how many cups of fruit do you eat each day?", {})} />
      <input type="text" placeholder="On average, how many cups of 100% fruit juice do you drink each day" {...register("On average, how many cups of 100% fruit juice do you drink each day", {})} />
      <input type="text" placeholder="On average, how many cups of vegetables do you eat each day?" {...register("On average, how many cups of vegetables do you eat each day?", {})} />
      <input type="text" placeholder="On average, how many cups of 100% vegetable juice do you drink each day?" {...register("On average, how many cups of 100% vegetable juice do you drink each day?", {})} />
      <select {...register("Attribute", { required: true })}>
        <option value="I believe that being physically active almost every day is important">I believe that being physically active almost every day is important</option>
        <option value="I feel it is worthwhile to engage in physical activity.">I feel it is worthwhile to engage in physical activity.</option>
        <option value="I enjoy being physically active.">I enjoy being physically active.</option>
        <option value="Being physically active is important for my overall physical health and wellbeing.">Being physically active is important for my overall physical health and wellbeing.</option>
        <option value="Being physically active is important for my mental/psychological health and wellbeing.   ">Being physically active is important for my mental/psychological health and wellbeing.   </option>
      </select>
      <input type="text" placeholder="The national recommendations are for adults to consume at least 5 cups of fruits/vegetables (F/V) per day" {...register("The national recommendations are for adults to consume at least 5 cups of fruits/vegetables (F/V) per day", {})} />

      <input type="submit" />
    </form>
  );
}